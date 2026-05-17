import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSessionServer } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

// 1. Робимо функцію async
export async function proxy(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const path = request.nextUrl.pathname;

  const response = NextResponse.next();

  // 2. Логіка поновлення сесії (Refresh Token)
  if (!accessToken && refreshToken) {
    try {
      const apiResponse = await checkSessionServer();

      // Якщо сервер видав нові кукі — записуємо їх у нашу відповідь
      const setCookieHeaders = apiResponse.headers["set-cookie"];
      if (setCookieHeaders) {
        if (Array.isArray(setCookieHeaders)) {
          setCookieHeaders.forEach((cookie) =>
            response.headers.append("Set-Cookie", cookie),
          );
        } else {
          response.headers.append("Set-Cookie", setCookieHeaders as string);
        }
      }
      // Ставимо заглушку, щоб пропустити юзера далі
      accessToken = "refreshed";
    } catch (error) {
      accessToken = undefined; // Якщо рефреш не вдався (наприклад, токен протух)
    }
  }

  const isPrivateRoute = privateRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && accessToken) {
    // 3. Змінили перенаправлення на домашню сторінку "/"
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
