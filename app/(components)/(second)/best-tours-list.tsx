"use client";
import { FunctionComponent } from "react";
import TourCard from "@/components/common/tour-card";
import { Button } from "@nextui-org/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import Swiper from "react-id-swiper";
import "swiper/css";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { REVALIDATE_CONTENT_LIST, REVALIDATE_TOUR_LIST } from "@/lib/keys";
import { getContentData, getTours } from "@/lib/operations";
interface BestToursListProps {}

const BestToursList: FunctionComponent<BestToursListProps> = () => {
  const { data: config, isLoading } = useQuery({
    queryKey: [REVALIDATE_CONTENT_LIST],
    queryFn: async () => await getContentData(),
  });

  console.log("config", config?.best_tours);

  const { data } = useQuery({
    queryKey: [REVALIDATE_TOUR_LIST],
    queryFn: async () => await getTours(),
    select(data) {
      return data?.filter((x) => config?.best_tours?.tours?.includes(x.id!));
    },
  });

  const swiperRef = useRef<any>(null);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const swiperParams = {
    slidesPerView: "auto",
    spaceBetween: 30,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      900: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1500: {
        slidesPerView: 4,
      },
    },
  };
  return (
    <div className=" py-16">
      <div className="container">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl text-center">الأكثر طلباً</h1>
          <div className="flex justify-end">
            <Button
              isIconOnly
              size="sm"
              className="group hover:text-primary duration-500 transition-all"
              variant="light"
              onPress={goPrev}
            >
              <ArrowRight className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              className="group hover:text-primary duration-500 transition-all"
              variant="light"
              onPress={goNext}
            >
              <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <Swiper {...swiperParams} ref={swiperRef}>
          {data?.map((item, index) => (
            <motion.div
              key={item.id}
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
              <TourCard tour={item} />
            </motion.div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestToursList;
