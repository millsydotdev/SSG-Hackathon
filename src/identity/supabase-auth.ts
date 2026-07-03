import { createBrowserClient } from "@supabase/ssr";
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
  } | null;

  if (!s?.user) {
    return {
      user: null,
      status: "unauthenticated",
      accessToken: null,
      expiresAt: null,
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
  };
}

export function createSupabaseAuthService(): AuthService {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

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
          data: {
            username: params.username,
            display_name: params.displayName,
          },
        },
      });

      if (error) {
        return {
          session: {
            user: null,
            status: "unauthenticated",
            accessToken: null,
            expiresAt: null,
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
      if (error) {
        return {
          error: {
            code: error.status?.toString() ?? "unknown",
            message: error.message,
          },
        };
      }
      return { error: null };
    },

    refreshSession: async () => {
      const { data } = await client.auth.refreshSession();
      return mapSession(data.session);
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
