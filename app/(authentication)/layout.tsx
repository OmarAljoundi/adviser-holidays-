import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import React, { ReactNode, Suspense } from "react";
import {
  alfont,
  englishFont,
  notoKufiArabic,
  notoSans,
  shekari,
} from "../fonts";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "@/provider/react-query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <React.Fragment>
      <html dir="ltr" lang="en">
        <body
          className={cn(
            notoKufiArabic.variable,
            notoSans.variable,
            alfont.variable,
            englishFont.variable,
            shekari.variable
          )}
        >
          <Suspense>
            <NuqsAdapter>
              <Toaster richColors />
              <ReactQueryProvider>
                <TooltipProvider>
                  <div className="relative flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4">
                    <div className="absolute inset-0 z-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
                    </div>
                    <div className="absolute top-0 z-[-1] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
                    {children}
                  </div>
                </TooltipProvider>
              </ReactQueryProvider>
            </NuqsAdapter>
          </Suspense>
        </body>
      </html>
    </React.Fragment>
  );
}
