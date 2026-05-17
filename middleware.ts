import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Оскільки токени лежать на іншому домені (backend GoIT),
  // Next.js Middleware не може їх прочитати через політику безпеки браузера.
  // Тому ми передаємо всю роботу по захисту маршрутів нашому клієнтському AuthProvider.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
