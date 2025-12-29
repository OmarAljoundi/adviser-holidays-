"use client";
import BlurImage from "@/components/common/blur-image";
import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import IconTourProvider from "@/provider/icon-tour-provider";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { QueryTourSchema } from "@/schema";
interface TourImagesProps {
  tour: QueryTourSchema;
}

const TourImages: FunctionComponent<TourImagesProps> = ({ tour }) => {
  return (
    <div className="relative shadow-custom rounded-medium p-4">
      <Swiper
        dir="ltr"
        spaceBetween={30}
        className="overflow-visible-important"
        initialSlide={4}
        modules={[Navigation]}
        navigation={{
          nextEl: ".js-destination-next",
          prevEl: ".js-destination-prev",
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
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 2,
          },
        }}
      >
        {tour.images?.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              key={index}
              className="rounded-medium"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, translateY: 20 },
                visible: {
                  opacity: 1,
                  translateY: 0,
                  transition: {
                    duration: Math.max(0.5, ((index + 1) * 10) / 100),
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <div className="relative h-full group overflow-hidden rounded-medium ">
                <BlurImage
                  src={`${item}`}
                  alt="Hero Image"
                  quality={80}
                  fetchPriority={index == 0 ? "high" : "auto"}
                  loading={index == 0 ? "eager" : "lazy"}
                  fill
                  containerClassName="aspect-[3/2]"
                  className="bg-gray-300 mx-auto max-w-full rounded-medium "
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <button
          className="disabled:opacity-50 left-10 absolute top-1/2 translate-y-1/2 z-10  -prev flex justify-center items-center button -blue-1  
             shadow-1 w-10 h-10 rounded-medium sm:d-none js-destination-prev bg-white "
        >
          <IconTourProvider>
            <BsArrowLeftShort />
          </IconTourProvider>
        </button>
        <button
          className="disabled:opacity-50 right-10 absolute top-1/2 translate-y-1/2 z-10 -next flex justify-center items-center button -blue-1
            shadow-1 w-10 h-10 rounded-medium sm:d-none js-destination-next bg-white "
        >
          <IconTourProvider>
            <BsArrowRightShort />
          </IconTourProvider>
        </button>
      </div>
    </div>
  );
};

export default TourImages;
