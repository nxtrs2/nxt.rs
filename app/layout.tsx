import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import Logo from "@/components/logo";
import FloatingPixels from "@/components/FloatingPixels";

export const metadata = {
  title: "NXTRS",
  description: "Personal blog and portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen w-full overflow-hidden bg-image">
            <div className="mx-auto max-w-[1024px] min-h-screen relative z-10">
              <div className="p-4 md:p-6">
                <Logo />

                <div className="lg:ml-[100px]">{children}</div>
              </div>

              <Navigation />
            </div>

            {/* <div className="mx-auto max-w-[1024px] min-h-screen relative z-10">
              <div className="p-4 md:p-6">
                <Logo />
                {children}
              </div>
              
              <Navigation />
            </div> */}
            {/* <div className="fixed bottom-0 left-0 right-0 z-0 w-full">
              <div className=" w-full h-auto max-w-[800px] mx-auto" />
            </div> */}
            <FloatingPixels />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
