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
        const user = await checkSession();
        setUser(user);

        if (isPublicRoute) {
          router.push("/profile");
        }
      } catch {
        clearIsAuthenticated();

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
