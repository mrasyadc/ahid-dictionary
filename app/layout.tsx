// app/layout.tsx
import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Atlas of Human Infectious Disease Dictionary",
  description: "A comprehensive dictionary of human infectious diseases with search and visualization capabilities.",
  keywords: "infectious diseases, medical dictionary, health, disease information"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
