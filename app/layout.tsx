// app/layout.tsx
import { Provider } from "@/src/components/ui/provider";
import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/inter/700.css";
import "@fontsource/inter/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas of Human Infectious Disease Dictionary"
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>{children}</Provider>
        <Script
          defer
          src='https://umami.oculab.ai/script.js'
          data-website-id='dfce27b1-1252-4b93-94a0-bc69bb1343f5'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
