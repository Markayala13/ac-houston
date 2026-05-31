import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XMAX AIRCONDITIONER | Heating • Cooling • Maintenance",
  description: "El Aire Perfecto para tu Hogar en Houston. Servicios de instalación, mantenimiento y reparación de aire acondicionado.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-deep-black text-foreground flex flex-col">{children}</body>
    </html>
  );
}
