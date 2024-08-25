import { NextRequest, NextResponse } from "next/server";

const parseJwt = (token: string | undefined) => {
  if (token) {
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return null; // Return null if the token is malformed
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = Buffer.from(base64, "base64").toString();
      return JSON.parse(payload);
    } catch (e) {
      console.error("Failed to parse JWT:", e);
      return null; // Return null if parsing fails
    }
  }
  return null; // Return null if token is undefined
};

export function middleware(req: NextRequest) {
  const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const protectedRoutes = [
    "/",
    "/cars",
    "/drivers",
    "/locations",
    "/trips",
    "/travelers",
    "/bookings",
    "/settings",
    "/profile",
    "/reports",
  ];
  let now = Date.now();
  let parsedToken = { exp: 0 };
  let token = req.cookies.get("token")?.value;

  if (token) {
    const parsed = parseJwt(token);
    if (parsed) {
      parsedToken = parsed;
    }
  }

  if (
    (protectedRoutes.includes(req.nextUrl.pathname) && !token) ||
    (parsedToken.exp && now > parsedToken.exp * 1000) // Check token expiration (exp is usually in seconds)
  ) {
    req.cookies.delete("currentUser");
    req.cookies.delete("token");
    const res = NextResponse.redirect(new URL("/login", req.nextUrl));
    res.cookies.delete("currentUser");
    res.cookies.delete("token");
    return res;
  }

  if (authRoutes.includes(req.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
