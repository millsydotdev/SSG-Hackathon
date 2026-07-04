import type { AuthService } from "./auth-service";
import type {
  AuthResult,
  IdentitySession,
  SignInParams,
  SignUpParams,
} from "./types";

function mapSession(supabaseSession: unknown): IdentitySession {
  const s = supabaseSession as {
    user?: {
      id: string;
      email?: string;
      user_metadata?: Record<string, unknown>;
    };
    access_token?: string;
    expires_at?: number;
    provider_token?: string;
  } | null;

  if (!s?.user) {
    return {
      user: null,
      status: "unauthenticated",
      accessToken: null,
      expiresAt: null,
      providerToken: null,
    };
  }

  return {
    user: {
      id: s.user.id,
      email: s.user.email ?? "",
      username:
        (s.user.user_metadata?.username as string) ??
        s.user.email?.split("@")[0] ??
        "unknown",
      displayName:
        (s.user.user_metadata?.display_name as string) ??
        (s.user.user_metadata?.full_name as string) ??
        s.user.email?.split("@")[0] ??
        "User",
      avatarUrl: (s.user.user_metadata?.avatar_url as string) ?? null,
    },
    status: "authenticated",
    accessToken: s.access_token ?? null,
    expiresAt: s.expires_at
      ? new Date(s.expires_at * 1000).toISOString()
      : null,
    providerToken: s.provider_token ?? null,
  };
}

export async function createSupabaseAuthService(
  supabaseUrl: string,
  supabaseAnonKey: string,
): Promise<AuthService> {
  const { createBrowserClient } = await import("@supabase/ssr");
  const client = createBrowserClient(supabaseUrl, supabaseAnonKey);

  return {
    getSession: async () => {
      const { data } = await client.auth.getSession();
      return mapSession(data.session);
    },

    signIn: async (params: SignInParams): Promise<AuthResult> => {
      const { data, error } = await client.auth.signInWithPassword({
        email: params.username,
        password: params.password,
      });
      if (error) {
        return {
          session: {
            user: null,
            status: "unauthenticated",
            accessToken: null,
            expiresAt: null,
            providerToken: null,
          },
          error: {
            code: error.status?.toString() ?? "unknown",
            message: error.message,
          },
        };
      }
      return { session: mapSession(data.session), error: null };
    },

    signUp: async (params: SignUpParams): Promise<AuthResult> => {
      const { data, error } = await client.auth.signUp({
        email: `${params.username}@placeholder.dev`,
        password: params.password,
        options: {
          data: { username: params.username, display_name: params.displayName },
        },
      });
      if (error) {
        return {
          session: {
            user: null,
            status: "unauthenticated",
            accessToken: null,
            expiresAt: null,
            providerToken: null,
          },
          error: {
            code: error.status?.toString() ?? "unknown",
            message: error.message,
          },
        };
      }
      return { session: mapSession(data.session), error: null };
    },

    signOut: async () => {
      const { error } = await client.auth.signOut();
      return {
        error: error
          ? {
              code: error.status?.toString() ?? "unknown",
              message: error.message,
            }
          : null,
      };
    },

    refreshSession: async () => {
      const { data } = await client.auth.refreshSession();
      return mapSession(data.session);
    },

    signInWithOAuth: async (provider: string) => {
      await client.auth.signInWithOAuth({
        provider: provider as "github",
        options: {
          redirectTo: `${window.location.origin}/app/integrations/github`,
        },
      });
    },

    getGitHubToken: async () => {
      const { data } = await client.auth.getSession();
      return data.session?.provider_token ?? null;
    },

    onAuthStateChange: (callback) => {
      const {
        data: { subscription },
      } = client.auth.onAuthStateChange((_event, session) => {
        callback(mapSession(session));
      });
      return () => subscription.unsubscribe();
    },
  };
}
