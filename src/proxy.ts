import { NextResponse, type NextRequest } from "next/server";

const publicPaths = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify",
  "/",
];

const workspacePattern = /^\/w\//;
const settingsPattern = /^\/settings/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path),
  );

  if (isPublic) {
    return NextResponse.next();
  }

  const isWorkspaceRoute = workspacePattern.test(pathname);
  const isSettingsRoute = settingsPattern.test(pathname);

  if (isWorkspaceRoute || isSettingsRoute) {
    const sessionCookie = request.cookies.get("session");
    if (!sessionCookie) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|api/auth).*)",
  ],
};
