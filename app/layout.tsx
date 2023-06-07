// app/layout.tsx
import { Providers } from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas of Human Infectious Disease Dictionary",
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
    </html>
  );
}
