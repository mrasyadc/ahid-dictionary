// app/layout.tsx
import { Providers } from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas of Human Infectious Disease Dictionary",
  "google-site-verification": "7dw65JxAOx5PFJ6qeMi2J1QWGMRoXpq52YE3XOXFJfU"
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
