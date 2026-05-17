import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Визначаємо масиви маршрутів
const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export function proxy(request: NextRequest) {
  // Дістаємо токен доступу з cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  const isPrivateRoute = privateRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Якщо маршрут приватний, а токена немає -> кидаємо на логін
  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Якщо маршрут публічний (автентифікація), а токен є -> кидаємо в профіль
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Усі інші запити пропускаємо
  return NextResponse.next();
}
