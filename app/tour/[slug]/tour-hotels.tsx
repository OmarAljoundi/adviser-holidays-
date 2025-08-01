"use client";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { motion } from "framer-motion";
import { QueryTourSchema } from "@/schema";
const TourHotels: FC<{ tour: QueryTourSchema }> = ({ tour }) => {
  return (
    <div className="relative shadow-custom rounded-medium p-4">
      <h4 className="mb-0 text-2xl font-semibold font-primary">
        {" "}
        الفنادق المتوقعة
      </h4>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tour?.tourHotels?.map((i, index) => (
          <motion.div
            key={index}
            className="rounded-medium shadow-custom p-4"
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
            <div
              className="pt-2 flex items-start justify-between pb-2 relative h-20 "
              key={i}
            >
              <div className="space-y-2">
                <div>
                  <h4 className="font-bold text-large text-right ">{i}</h4>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TourHotels;
