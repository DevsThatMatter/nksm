import type { Metadata, Viewport } from "next";
import { inter } from "@/app/utils/fonts";
import "./styles/globals.css";
import { cn } from "@/app/utils";
import { ThemeProvider } from "@/app/components/providers/theme-provider";
import { EdgeStoreProvider } from "./utils/edgestore";
import { QueryProvider } from "./components/providers/query-provider";
import { Toaster } from "./components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "NKSM",
  description: "NIT Kurukshetra Student Marketplace",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const RootLayout = ({
  modals,
  children,
}: {
  modals: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen antialiased", inter.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <QueryProvider>
              <EdgeStoreProvider>
                {modals}
                {children}
              </EdgeStoreProvider>
              <Toaster position="bottom-left" richColors />
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
