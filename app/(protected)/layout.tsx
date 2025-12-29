import { SidebarMenuLayout } from "@/components/admin-panel/sidebar-menu-layout";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { cn } from "@/lib/utils";
import { monaSans, notoKufiArabic, notoSans } from "../fonts";
import { AuthGuardProvider } from "@/provider/auth-guard-provider";
import React, { Suspense } from "react";
import { InitGlobalTransitionProvider } from "@/provider/init-global-transition-provider";
import ReactQueryProvider from "@/provider/react-query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/provider/theme-provider";

export const metadata: Metadata = {
  title: "Adviser - Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <html dir="ltr" lang="en">
        <body
          className={cn(
            monaSans.className,
            notoKufiArabic.variable,
            notoSans.variable
          )}
        >
          <Suspense>
            <InitGlobalTransitionProvider />
            <AuthGuardProvider>
              <NuqsAdapter>
                <Toaster richColors />
                <ReactQueryProvider>
                  <TooltipProvider>
                    <ThemeProvider
                      attribute="class"
                      defaultTheme="system"
                      enableSystem
                      disableTransitionOnChange
                    >
                      <SidebarMenuLayout>{children}</SidebarMenuLayout>
                    </ThemeProvider>
                  </TooltipProvider>
                </ReactQueryProvider>
              </NuqsAdapter>
            </AuthGuardProvider>
          </Suspense>
        </body>
      </html>
    </React.Fragment>
  );
}
