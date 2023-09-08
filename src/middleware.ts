import { NextRequest, NextResponse } from "next/server";

const parseJwt = (token: string | undefined) => {
  if (token != null)
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
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
    parsedToken = parseJwt(token);
  }
  if (
    (protectedRoutes.includes(req.nextUrl.pathname) && !token) ||
    now < parsedToken.exp
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
