import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from '@/components/Auth/AuthProvider';
import { MapProvider } from '@/contexts/MapContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProblemsInTheWorld.com",
  description: "We are a community of people who want to make a difference in the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}