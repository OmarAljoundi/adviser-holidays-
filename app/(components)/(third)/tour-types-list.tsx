"use client";
import BlurImage from "@/components/common/blur-image";
import { Separator } from "@/components/ui/separator";
import IconTourProvider from "@/provider/icon-tour-provider";
import { Button, Skeleton } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { REVALIDATE_TOUR_TYPE } from "@/lib/keys";
import { getTourTypes } from "@/lib/operations";
interface TourTypesListProps {}

const TourTypesList: FunctionComponent<TourTypesListProps> = () => {
  const { data } = useQuery({
    queryKey: [REVALIDATE_TOUR_TYPE],
    queryFn: async () => await getTourTypes(),
  });

  return (
    <div className="relative  p-4">
      <div className="container">
        <h1 className="text-3xl text-center">أنواع البرامج</h1>

        <div className="flex justify-between items-end">
          <div className="flex justify-end">
            <Button
              isIconOnly
              size="sm"
              className="group hover:text-primary duration-500 transition-all js-tour-types-home-next"
              variant="light"
            >
              <ArrowRight className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="group hover:text-primary duration-500 transition-all js-tour-types-home-prev"
              variant="light"
            >
              <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <Swiper
          spaceBetween={30}
          initialSlide={5}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".js-tour-types-home-next",
            prevEl: ".js-tour-types-home-prev",
          }}
          pagination={{
            el: ".js-tour-tour-types-home-pag",
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
        >
          {data?.results?.map((i, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, translateY: 20 },
                  visible: {
                    opacity: 1,
                    translateY: 0,
                    transition: {
                      duration: 1,
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="shadow-custom rounded-medium"
              >
                <div className="grid p-4 space-y-2 justify-items-center">
                  <IconTourProvider>
                    <BlurImage
                      src={`${i.image}`}
                      alt={i.name || ""}
                      width={150}
                      height={150}
                      className="w-12 h-12"
                    />
                  </IconTourProvider>
                  <h1>{i.name}</h1>
                  <Button
                    size="sm"
                    className="group hover:text-primary duration-500 transition-all"
                    as={Link}
                    variant="light"
                    endContent={
                      <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
                    }
                    href={`/tour-listing?type=${i.name}`}
                  >
                    عرض الرحلات
                  </Button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-auto">
          <div className="flex gap-x-4 items-center justify-center mt-5">
            <div className="w-auto">
              <div className="flex w-full -dots text-border js-tour-tour-types-home-pag" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourTypesList;
