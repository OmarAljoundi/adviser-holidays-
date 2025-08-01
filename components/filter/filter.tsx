"use client";
import React, { FC, useMemo } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountryDropdown from "./country-dropdown";
import DestinationDropdown from "./destination-dropdown";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { getDestinations } from "@/server/public-query.server";
import DurationDropdown from "./duration-dropdown";

export const ITEMS_VAR = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

type FilterOptions = {
  onChange: boolean;
  enableTabs?: boolean;
  destinationPromise: ReturnType<typeof getDestinations>;
};

const Filter: FC<FilterOptions> = ({
  onChange,
  destinationPromise,
  enableTabs = false,
}) => {
  const destinations = React.use(destinationPromise);
  const searchParams = useSearchParams();

  const url = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return `/tour-listing?${params.toString()}`;
  }, [searchParams]);

  return (
    <div className="px-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={cn(
          `p-3 sm:p-4 lg:py-6 lg:px-8 bg-white border-border border mt-4 lg:mt-0
           shadow-lg  grid  grid-cols-2 lg:grid-cols-3 rounded-medium lg:rounded-medium gap-y-2 lg:divide-x-reverse lg:divide-x-2 divide-border`
        )}
      >
        {enableTabs && (
          <React.Fragment>
            <motion.div
              //@ts-ignore
              variants={{ ...ITEMS_VAR }}
              className="lg:px-4 first:lg:pr-0 last:lg:pl-0 col-span-full lg:col-span-1"
            >
              <DestinationDropdown destinations={destinations?.result || []} />
            </motion.div>
            <Separator className="lg:hidden col-span-full " />
          </React.Fragment>
        )}
        <motion.div
          //@ts-ignore
          variants={{ ...ITEMS_VAR }}
          className="lg:px-4 first:lg:pr-0 last:lg:pl-0"
        >
          <CountryDropdown />
        </motion.div>
        <motion.div
          //@ts-ignore
          variants={{ ...ITEMS_VAR }}
          className="lg:px-4 first:lg:pr-0 last:lg:pl-0"
        >
          <DurationDropdown />
        </motion.div>

        {!onChange && <Separator className="lg:hidden col-span-full " />}

        {!onChange && (
          <motion.div
            //@ts-ignore
            variants={{ ...ITEMS_VAR }}
            className={cn(
              "lg:px-4 first:lg:pr-0 last:lg:pl-0",
              onChange ? "col-span-1" : "col-span-2 lg:col-span-1"
            )}
          >
            <Link href={url}>
              <Button className="w-full rounded-full" size={"sm"}>
                <SearchIcon className="text-white size-6" />
                <span className="mr-2 text-white text-lg font-primary">
                  أبحث
                </span>
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(Filter);
