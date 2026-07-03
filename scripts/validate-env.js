/**
 * Pre-build environment validation script.
 * Run during CI/CD to catch missing variables early.
 */
const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

function main() {
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `\n❌ Missing required environment variables:\n` +
        missing.map((k) => `   - ${k}`).join("\n") +
        `\n\nCheck your Vercel environment variables.\n`,
    );
    process.exit(1);
  }

  console.log("✅ All required environment variables are set.");
}

main();
