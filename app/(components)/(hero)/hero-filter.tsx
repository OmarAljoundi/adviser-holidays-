"use client";
import CountryDropdown from "@/components/hero-filter/country-dropdown";
import DestinationDropdown from "@/components/hero-filter/destination-dropdown";
import DurationDropdown from "@/components/hero-filter/duration-dropdown";
import TypeDropdown from "@/components/hero-filter/type-dropdown";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import queryString from "query-string";
import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { CONTAINER_VAR, ITEMS_VAR } from "@/lib/motions";
import { Location, TourType } from "@/types/custom";
import { useQuery } from "@tanstack/react-query";
import { REVALIDATE_TOUR_TYPE } from "@/lib/keys";
import { getTourTypes } from "@/lib/operations";
import { useCustomerFilter } from "@/hooks/use-customer-filter";
import BlurImage from "@/shared/blur-image";

interface HeroFilterProps {}

const HeroFilter: FunctionComponent<HeroFilterProps> = () => {
  const { filter } = useCustomerFilter();
  const { data: types } = useQuery({
    queryKey: [REVALIDATE_TOUR_TYPE],
    queryFn: async () => await getTourTypes(),
  });

  const getUrl = () => {
    var obj = structuredClone(filter);
    delete obj.location;
    const url = queryString.stringifyUrl(
      {
        url: filter?.location
          ? `/tour-listing/${filter.location}`
          : "/tour-listing",
        query: obj,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: "comma",
        encode: true,
      }
    );
    return url;
  };

  return (
    <>
      <motion.div
        className={cn(
          "p-3 sm:p-4 relative lg:py-6 lg:px-8 bg-white  border  grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-x-6 sm:gap-y-2 h-full rounded-none xl:rounded-medium"
        )}
        variants={CONTAINER_VAR}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex flex-wrap gap-y-2 justify-between items-center col-span-2 mb-1 lg:col-span-4 xl:col-span-5"
          variants={{ ...ITEMS_VAR }}
        >
          <h1 className="text-xl text-center  ">ابحث عن الرحلة التي تناسبك</h1>
          <BlurImage
            src={"/europa-logo.png"}
            width={200}
            height={50}
            quality={100}
            alt="europa-logo"
            className="bg-white shadow-custom rounded-medium max-w-[130px] "
          />
        </motion.div>

        <motion.div variants={{ ...ITEMS_VAR }}>
          <DestinationDropdown />
        </motion.div>

        <motion.div variants={{ ...ITEMS_VAR }}>
          <CountryDropdown />
        </motion.div>
        <motion.div variants={{ ...ITEMS_VAR }}>
          <TypeDropdown types={types?.results ?? []} />
        </motion.div>

        <motion.div variants={{ ...ITEMS_VAR }}>
          <DurationDropdown />
        </motion.div>

        <motion.div
          variants={{ ...ITEMS_VAR }}
          className="col-span-2 lg:col-span-4 xl:col-span-1"
        >
          <Button
            className="w-full "
            size={"sm"}
            as={Link}
            href={getUrl()}
            endContent={<SearchIcon className="text-white" />}
            color="primary"
          >
            <span className="mr-2 text-white text-lg">أبحث</span>
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default HeroFilter;
