import { NextResponse, type NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/login",
  "/join",
  "/forgot-password",
  "/privacy",
  "/terms",
  "/status",
  "/setup",
  "/api/health",
  "/api/validate-setup-key",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

  // First-run detection: redirect uninitialised deployments to /setup
  if (!isPublic && pathname !== "/setup") {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && anonKey) {
      try {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/rpc/is_platform_initialised`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: anonKey,
            },
          },
        );
        const data = await res.json();
        if (data !== true) {
          return NextResponse.redirect(new URL("/setup", request.url));
        }
      } catch {
        // If check fails, allow normal flow
      }
    }
  }

  if (isPublic) {
    return NextResponse.next();
  }

  const isProtected =
    pathname.startsWith("/app") || pathname.startsWith("/settings");

  if (isProtected) {
    const hasSession = [...request.cookies].some(([name]) =>
      name.startsWith("sb-"),
    );
    if (!hasSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|favicon.svg|logo-192.png|manifest.webmanifest|robots.txt|images|fonts).*)"],
};
