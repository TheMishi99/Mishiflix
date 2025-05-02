import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./utils/functions";

const guessRoutes = ["/auth/login", "/auth/sign-up"];
const loggedIn = ["/auth/profile"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (guessRoutes.includes(request.nextUrl.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  if (loggedIn.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    const isValid = await decodeToken(token);
    if (!isValid) {
      request.cookies.delete("token");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = { matcher: ["/auth/:path*"] };
