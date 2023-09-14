import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Navbar from "@/components/navbar/navbar";

import ReactQueryProvider from "@/providers/react-query";
import { UserContextProvider } from "@/contexts/UserContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BloodLink",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider localization={ptBR}>
          <ReactQueryProvider>
            <UserContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <div className="relative flex min-h-screen flex-col">
                  <Navbar />
                  <div className="flex-1">
                    <div className="container pt-6 overflow-x-hidden mb-8">
                      oi
                    </div>
                  </div>
                </div>
                {/* <Footer /> */}
              </ThemeProvider>
              <Toaster />
            </UserContextProvider>
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
