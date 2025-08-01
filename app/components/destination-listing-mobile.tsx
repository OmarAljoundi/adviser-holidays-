"use client";
import BlurImage from "@/components/common/blur-image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import "swiper/css/free-mode";
import { REVALIDATE_LOCATION_LIST } from "@/lib/keys";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Scrollbar } from "swiper/modules";
import { getDestinations } from "@/server/public-query.server";
import { getTotalToursSeprate } from "./destination-listing";

const DestinationListingMobile = () => {
  const { data: destinations } = useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestinations(),
  });
  return (
    <div className="container mt-10 mb-10 md:hidden">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">الأقسام</h1>

        <div className="flex justify-end">
          <Button
            isIconOnly
            size="sm"
            className="group hover:text-primary duration-500 transition-all js-destination-next"
            variant="light"
          >
            <ArrowRight className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            className="group hover:text-primary duration-500 transition-all js-destination-prev"
            variant="light"
          >
            <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
          </Button>
        </div>
      </div>
      <Separator className="my-4" />

      <Swiper
        dir="ltr"
        spaceBetween={30}
        className="overflow-visible-important"
        scrollbar={{
          el: ".js-popular-destination-scrollbar",
          draggable: true,
        }}
        freeMode={true}
        initialSlide={4}
        modules={[Scrollbar, Navigation, FreeMode]}
        navigation={{
          nextEl: ".js-destination-next",
          prevEl: ".js-destination-prev",
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {destinations?.result?.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={`/tour-listing/${item.slug}`}
              className="citiesCard -type-1 d-block  group hover:cursor-pointer"
              key={item.id}
            >
              <div
                className="citiesCard__image ratio aspect-[3/4] h-full w-full before:w-full  
                   before:absolute before:h-full before:bottom-0 before:left-0 before:bg-gradient-to-t 
                 before:from-black/75 before:z-10  
                  before:to-black/10"
              >
                <BlurImage
                  src={
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.image?.url}` ||
                    ""
                  }
                  loading="eager"
                  alt=""
                  fill
                  className="object-cover rounded-none"
                  containerClassName="w-full h-full aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-none  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
                />
                <figcaption
                  className="absolute z-20  justify-center items-center   p-3 bottom-0 left-0 right-0 mx-auto  rounded-none  flex  text-white    
                    sm:py-4 sm:px-6"
                >
                  <div className="text-center">
                    <h1 className="text-base text-white ">{item.name}</h1>
                    <p className="text-base mt-2 text-white ">
                      {getTotalToursSeprate(item)?.count}{" "}
                      {getTotalToursSeprate(item)?.word}{" "}
                    </p>
                  </div>
                </figcaption>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-2">
        <div className="slider-scrollbar mt-2 relative  js-popular-destination-scrollbar bg-[#eaeaea]" />
      </div>
    </div>
  );
};

export default DestinationListingMobile;
