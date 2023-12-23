import React, { ComponentProps, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BlurImage from "./blur-image";
import { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import IconTourProvider from "@/provider/icon-tour-provider";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

interface CarouselProps {
  images: string[];
  classNames?: {
    image?: string;
    container?: string;
    swiper?: string;
  };
  includeArrows?: boolean;
  uniqueKey: string;
}

export default function Carousel({
  images,
  classNames,
  uniqueKey,
  includeArrows = true,
}: CarouselProps) {
  return (
    <div className="relative">
      <Swiper
        dir="ltr"
        className="swiper_zero_padding"
        spaceBetween={0}
        slidesPerView={1}
        pagination={true}
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: `.js-carousel-next-${uniqueKey}`,
          prevEl: `.js-carousel-prev-${uniqueKey}`,
        }}
      >
        {images.length == 0 && (
          <SwiperSlide>
            <div className="relative    h-full group overflow-hidden rounded-medium ">
              <BlurImage
                src={"/images/placeholder.svg"}
                alt="Placeholder"
                quality={80}
                width={1000}
                height={600}
                fetchPriority="auto"
                loading={"lazy"}
                className={cn(
                  " mx-auto max-w-full rounded-medium bg-gray-300",
                  classNames?.image
                )}
              />
            </div>
          </SwiperSlide>
        )}

        {images.map((slide, i) => (
          <SwiperSlide key={i} style={{ width: "inherit!important" }}>
            <div className="relative h-full group overflow-hidden">
              <BlurImage
                src={slide}
                width={1000}
                height={600}
                quality={100}
                alt="Carousal-Image"
                fetchPriority="auto"
                loading={"lazy"}
                className={cn(
                  "bg-gray-300 mx-auto max-w-full rounded-medium",
                  classNames?.image
                )}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {includeArrows && (
        <div>
          <button
            className={cn(
              `disabled:opacity-50 left-2 absolute top-1/2 translate-y-1/2 z-10  -prev flex justify-center items-center button -blue-1  
    shadow-1 w-5 h-5 rounded-medium sm:d-none  bg-white`,
              `js-carousel-prev-${uniqueKey}`
            )}
          >
            <IconTourProvider>
              <BsArrowLeftShort />
            </IconTourProvider>
          </button>
          <button
            className={cn(
              `disabled:opacity-50 right-2 absolute top-1/2 translate-y-1/2 z-10 -next flex justify-center items-center button -blue-1
    shadow-1 w-5 h-5 rounded-medium sm:d-none bg-white`,
              `js-carousel-next-${uniqueKey}`
            )}
          >
            <IconTourProvider>
              <BsArrowRightShort />
            </IconTourProvider>
          </button>
        </div>
      )}
    </div>
  );
}
