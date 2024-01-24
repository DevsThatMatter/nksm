import type { Metadata, Viewport } from "next";
import { inter } from "@/app/utils/fonts";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { SocketProvider } from "@/providers/socketProvider";

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SocketProvider>
            {children}
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
