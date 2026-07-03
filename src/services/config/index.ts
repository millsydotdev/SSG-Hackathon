export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "SSG-Hackathon",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    version: "0.1.0",
    environment: (process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development") as
      "development" | "preview" | "production",
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  },
  redis: {
    url: process.env.UPSTASH_REDIS_REST_URL ?? "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
  },
  features: {
    enableSubmissions: process.env.NEXT_PUBLIC_ENABLE_SUBMISSIONS === "true",
    enableJudging: process.env.NEXT_PUBLIC_ENABLE_JUDGING === "true",
  },
} as const;

export type Config = typeof config;
