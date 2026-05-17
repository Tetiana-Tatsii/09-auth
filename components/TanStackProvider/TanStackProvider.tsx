"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// 1. Функція для створення нового клієнта з налаштуваннями
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}

// Змінна для збереження клієнта в браузері
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // На сервері (SSR) завжди створюємо новий клієнт для кожного запиту
    return makeQueryClient();
  } else {
    // У браузері створюємо клієнт лише один раз і перевикористовуємо його,
    // щоб Turbopack та гаряче перезавантаження не губили контекст
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function TanStackProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Отримуємо стабільний екземпляр клієнта
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
