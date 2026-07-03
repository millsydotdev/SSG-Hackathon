import { NextResponse, type NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/login",
  "/join",
  "/forgot-password",
  "/privacy",
  "/terms",
  "/status",
  "/api/health",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|fonts).*)"],
};
