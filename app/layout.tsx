export const dynamic = "force-dynamic";
import "./globals.css";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import Menu from "@/layout/customer/menu";
import Footer from "@/layout/customer/footer";
import dynamics from "next/dynamic";
import NextUIProvider from "@/provider/next-ui-provider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: true,
  style: "normal",
  weight: ["1000", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-primary",
});

const ReactQueryProvider = dynamics(
  () => import("@/provider/react-query-provider"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();

  return (
    <html
      dir={headersList.get("x-dir") ?? "rtl"}
      lang={headersList.get("x-lang") ?? "ar"}
      style={{ height: "100%" }}
    >
      <body className={cn(cairo.className, cairo.variable, "h-full")}>
        <Toaster position="top-right" expand={true} richColors />

        <ReactQueryProvider>
          <NextUIProvider>
            {headersList.get("x-dir") == "rtl" ? (
              <>
                <Menu />
                {children}
                <Footer />
              </>
            ) : (
              <> {children}</>
            )}
          </NextUIProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
