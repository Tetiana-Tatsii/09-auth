import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSessionServer } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const path = request.nextUrl.pathname;

  let setCookieHeaders: string[] | string | undefined;

  if (!accessToken && refreshToken) {
    try {
      const apiResponse = await checkSessionServer();
      setCookieHeaders = apiResponse.headers["set-cookie"];
      accessToken = "refreshed";
    } catch (error) {
      accessToken = undefined;
    }
  }

  const isPrivateRoute = privateRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  let response = NextResponse.next();

  if (isPrivateRoute && !accessToken) {
    response = NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (isAuthRoute && accessToken) {
    response = NextResponse.redirect(new URL("/", request.url));
  }

  if (setCookieHeaders) {
    if (Array.isArray(setCookieHeaders)) {
      setCookieHeaders.forEach((cookie) =>
        response.headers.append("Set-Cookie", cookie),
      );
    } else {
      response.headers.append("Set-Cookie", setCookieHeaders as string);
    }
  }

  return response;
}
