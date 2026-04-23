import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "VibeSpot | Find your vibe in Dhaka",
  description: "Community-powered place and event discovery platform serving Dhaka's urban population.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased min-h-screen flex flex-col">
          <Providers>
            <Navbar />
            <main className="flex-1 relative z-0">{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </AuthProvider>
  );
}
