export const dynamic = "force-dynamic";
import "./globals.css";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import Menu from "@/layout/menu";
import Footer from "@/layout/footer";
import NextUIProvider from "@/provider/next-ui-provider";
import ReactQueryProvider from "@/provider/react-query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: true,
  style: "normal",
  weight: ["1000", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-primary",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir={"rtl"} lang={"ar"} style={{ height: "100%" }}>
      <body className={cn(cairo.className, cairo.variable, "h-full")}>
        <Toaster position="top-right" expand={true} richColors />
        <NuqsAdapter>
          {" "}
          <ReactQueryProvider>
            <NextUIProvider>
              <Menu />
              {children}
              <Footer />
            </NextUIProvider>
          </ReactQueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
