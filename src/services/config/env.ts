export type EnvVar = {
  key: string;
  required: boolean;
  description: string;
  defaultValue?: string;
};

export const envVars: EnvVar[] = [
  {
    key: "NEXT_PUBLIC_APP_URL",
    required: true,
    description: "Public URL of the application",
    defaultValue: "http://localhost:3000",
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_URL",
    required: true,
    description: "Supabase project URL",
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    required: true,
    description: "Supabase anonymous key",
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    required: false,
    description: "Supabase service role key (server only)",
  },
  {
    key: "UPSTASH_REDIS_REST_URL",
    required: false,
    description: "Upstash Redis REST URL",
  },
  {
    key: "UPSTASH_REDIS_REST_TOKEN",
    required: false,
    description: "Upstash Redis REST token",
  },
  {
    key: "PLATFORM_SETUP_KEY",
    required: false,
    description: "Required for first-run platform initialisation (server only)",
  },
];

export type EnvValidation = {
  valid: boolean;
  missing: { key: string; description: string }[];
  warnings: { key: string; description: string }[];
};

export function validateEnv(): EnvValidation {
  const missing: EnvValidation["missing"] = [];
  const warnings: EnvValidation["warnings"] = [];

  for (const envVar of envVars) {
    const value = process.env[envVar.key];
    if (!value) {
      if (envVar.required) {
        missing.push({ key: envVar.key, description: envVar.description });
      } else {
        warnings.push({ key: envVar.key, description: envVar.description });
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

export function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        "Check your .env.local file or Vercel environment variables.",
    );
  }
  return value;
}
