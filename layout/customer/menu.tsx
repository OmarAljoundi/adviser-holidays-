"use client";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import BlurImage from "@/components/common/blur-image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MenuItems = [
  {
    title: "الرئيسية",
    link: "/",
  },
  {
    title: "جميع الرحلات",
    link: "/tour-listing",
  },
  {
    title: "التأشيرات",
    link: "/visa",
  },
  {
    title: "روابط مهمة",
    link: "/links",
  },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-card">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600" href="/" scroll={false}>
          <span className="sr-only">Home</span>
          <BlurImage
            src={"/main-logo.png"}
            width={1080}
            height={1080}
            className="max-w-[50px]"
            alt="ديسكفري لوجو"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {MenuItems.map((item) => (
                <li key={item.title} className="cursor-pointer">
                  <Link
                    scroll={false}
                    className={cn(
                      "transition hover:text-gray-500/75 font-primary cursor-pointer font-semibold",
                      pathname == item.link
                        ? "text-primary font-bold"
                        : "text-black"
                    )}
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Menu;
