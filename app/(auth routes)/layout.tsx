"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Оновлюємо роутер при монтуванні, як просив бот
    router.refresh();
  }, [router]);

  return <>{children}</>;
}
