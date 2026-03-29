// app/layout.tsx
import { Providers } from "./providers";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Atlas of Human Infectious Disease Dictionary"
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
      <Script
        defer
        src='https://umami.oculab.ai/script.js'
        data-website-id='dfce27b1-1252-4b93-94a0-bc69bb1343f5'
      />
    </html>
  );
}
