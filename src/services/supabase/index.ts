import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { config } from "@/services/config";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;
  browserClient = createBrowserClient(
    config.supabase.url,
    config.supabase.anonKey,
  );
  return browserClient;
}

let serverClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServerClient() {
  if (serverClient) return serverClient;
  if (!config.supabase.serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for server-side operations",
    );
  }
  serverClient = createClient(
    config.supabase.url,
    config.supabase.serviceRoleKey,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
  return serverClient;
}

export async function checkSupabaseHealth() {
  try {
    const response = await fetch(`${config.supabase.url}/rest/v1/`, {
      headers: { apikey: config.supabase.anonKey },
    });
    return {
      healthy: response.status < 500,
      error: response.ok
        ? undefined
        : `Supabase responded with ${response.status}`,
    };
  } catch (err) {
    return {
      healthy: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
