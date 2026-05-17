import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Переконайся, що імпорт стилів на місці
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Your safe place for notes",
};

export default function RootLayout({
  children,
  modal, // 1. Обов'язково додаємо modal сюди для паралельного маршруту!
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode; // 2. Типізуємо modal
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            {/* Наш сірий Хедер із навігацією */}
            <header
              style={{
                padding: "20px",
                background: "#1a1a1a",
                borderBottom: "1px solid #333",
              }}
            >
              <nav>
                <AuthNavigation />
              </nav>
            </header>

            {/* Тут будуть відображатися всі сторінки (page.tsx) */}
            {children}

            {/* Тут будуть відображатися модальні вікна з папки @modal */}
            {modal}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
