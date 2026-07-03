export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? "SSG-Hackathon",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  },
  features: {
    enableSubmissions: process.env.NEXT_PUBLIC_ENABLE_SUBMISSIONS === "true",
    enableJudging: process.env.NEXT_PUBLIC_ENABLE_JUDGING === "true",
  },
} as const;

export type Config = typeof config;
