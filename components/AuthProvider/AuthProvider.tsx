"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      setIsChecking(true);
      const isPrivateRoute = privateRoutes.some((route) =>
        pathname.startsWith(route),
      );
      const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route),
      );

      try {
        // Запитуємо бекенд, чи дійсний наш токен
        const user = await checkSession();
        setUser(user);

        // Якщо ми авторизовані і випадково зайшли на логін/реєстрацію -> кидаємо в профіль
        if (isPublicRoute) {
          router.push("/profile");
        }
      } catch {
        // Якщо токена немає або він згорів
        clearIsAuthenticated();

        // І якщо ми ліземо в приватну зону -> викидаємо на логін
        if (isPrivateRoute) {
          router.push("/sign-in");
        }
      } finally {
        setIsChecking(false);
      }
    };

    verifySession();
  }, [pathname, setUser, clearIsAuthenticated, router]);

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Показуємо лоадер, поки чекаємо відповіді від бекенда для приватних маршрутів
  if (isChecking && isPrivateRoute) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <h2 style={{ color: "#666" }}>Verifying your secure key...</h2>
      </div>
    );
  }

  return <>{children}</>;
}
