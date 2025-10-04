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
        src='https://umami.mrasyadc.com/script.js'
        data-website-id='69eb7755-e2fc-4f82-989d-77dc19f3d443'
      />
    </html>
  );
}
