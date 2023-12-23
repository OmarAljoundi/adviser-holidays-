"use client";
import { Separator } from "@/components/ui/separator";
import IconTourProvider from "@/provider/icon-tour-provider";
import { Tour } from "@/types/custom";
import { FunctionComponent } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { REVALIDATE_TOUR_LIST } from "@/lib/keys";
import { getTours } from "@/lib/operations";
import TourCard from "@/components/common/tour-card";
import TourListingLoading from "@/app/tour-listing/loading";
import { Navigation, Pagination } from "swiper/modules";
interface TourRelatedProps {
  tour: Tour;
}

const TourRelated: FunctionComponent<TourRelatedProps> = ({ tour }) => {
  const { data, isLoading } = useQuery({
    queryKey: [REVALIDATE_TOUR_LIST],
    queryFn: async () => await getTours(),
    select: (data) => {
      return data
        ?.filter((data_tour) => {
          return tour.tour_countries?.some((country) =>
            data_tour.tour_countries?.includes(country.trim())
          );
        })
        .splice(0, 10);
    },
  });

  if (isLoading) {
    return <TourListingLoading />;
  }

  return (
    <div className="relative shadow-custom rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary">
        {" "}
        رحلات مشابهة
      </h4>
      <Separator className="my-4" />
      <div className="p-4">
        <Swiper
          spaceBetween={30}
          className="lg:p-3"
          initialSlide={4}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".js-same-next",
            prevEl: ".js-same-prev",
          }}
          pagination={{
            el: ".js-tour-same-pag",
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            600: {
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
          {data?.map((i, index) => (
            <SwiperSlide key={index} className="!mr-0">
              <TourCard tour={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-auto">
        <div className="flex gap-x-4 items-center justify-center mt-5">
          <button
            className="disabled:opacity-50  z-10 -next flex justify-center items-center button -blue-1
              shadow-1 w-10 h-10 rounded-medium sm:d-none js-same-next bg-white "
          >
            <IconTourProvider>
              <BsArrowRightShort />
            </IconTourProvider>
          </button>
          <div className="w-auto">
            <div className="flex w-full -dots text-border js-tour-same-pag" />
          </div>
          <button
            className="disabled:opacity-50   -prev flex justify-center items-center button -blue-1  
               shadow-1 w-10 h-10 rounded-medium sm:d-none js-same-prev bg-white"
          >
            <IconTourProvider>
              <BsArrowLeftShort />
            </IconTourProvider>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourRelated;
