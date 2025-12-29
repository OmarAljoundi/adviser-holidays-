import Link from "next/link";
import { Button } from "../ui/button";

export const ToursNotFound = () => {
  return (
    <div className="mt-4 mb-16 mx-2">
      <div className="col-span-12 flex flex-col items-center justify-center p-18 bg-white shadow-xl rounded-2xl text-center min-h-[400px]">
        <div className="bg-secondary/20 p-6 rounded-full mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <h3 className="font-primary text-2xl font-bold text-neutral-800 mb-3">
          لم يتم العثور على رحلات
        </h3>
        <p className="font-primary text-neutral-500 mb-8 max-w-md text-lg leading-relaxed">
          نأسف، لا توجد رحلات تطابق خيارات البحث الحالية. جرب تغيير الفلاتر أو
          تصفح جميع الوجهات المتاحة.
        </p>
        <div className="flex gap-4">
          <Link href="/tour-listing">
            <Button variant="default" size="lg" className="font-primary">
              تصفح جميع الرحلات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
