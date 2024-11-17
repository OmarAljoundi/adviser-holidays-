"use client";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import FilterPrice from "./filter-price";
import FilterTypes from "./filter-types";
import FilterCountry from "./filter-country";
import FilterDuration from "./filter-duration";
import FilterLocation from "./filter-location";
import qs from "query-string";
import { queryString } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import ListingFilterLoading from "../loading/listing-filter-loading";
import { useQuery } from "@tanstack/react-query";
import { getDestination } from "@/lib/operations";
import FilterSection from "./filter-section";
import { useCustomerFilter } from "@/hooks/use-customer-filter";

interface FilterProps {}

const Filter: FunctionComponent<FilterProps> = () => {
  const search = useCustomerFilter();
  const [mount, setMount] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    let localSearch = { ...queryString };
    if (!mount) {
      const query = qs.parseUrl(window.location.href, {
        arrayFormat: "comma",
        decode: true,
      }).query;

      if (query.days && query.days.length > 0) {
        localSearch = {
          ...localSearch,
          days: query.days as string[],
        };
      }

      if (query.country && query.country.length > 0) {
        localSearch = {
          ...localSearch,
          country: query.country as string[],
        };
      }

      if (query.tab) {
        localSearch = {
          ...localSearch,
          tab: query.tab as string,
        };
      }

      if (query.type) {
        localSearch = {
          ...localSearch,
          type: query.type as string[],
        };
      }

      if (query.maxprice) {
        localSearch = {
          ...localSearch,
          maxprice: query.maxprice as string,
        };
      }

      if (query.minprice) {
        localSearch = {
          ...localSearch,
          minprice: query.minprice as string,
        };
      }

      if (query.sortMemebr && query.sortOrder) {
        localSearch = {
          ...localSearch,
          sortMemebr: query.sortMemebr as string,
          sortOrder: Number(query.sortOrder),
        };
      }
      search.onAdd(localSearch);
      setMount(true);
    }
  }, [mount]);

  const getSearch = useCallback(() => {
    const query = {
      ...qs.parseUrl(window.location.href, {
        arrayFormat: "comma",
        decode: true,
      }).query,
      days: search.filter?.days,
      country: search.filter?.country,
      tab: search.filter?.tab,
      type: search.filter?.type,
      maxprice: search.filter?.maxprice,
      minprice: search.filter?.minprice,
      sortMemebr: search.filter?.sortMemebr,
      sortOrder: search.filter?.sortOrder,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: "comma",
        encode: true,
      }
    );
    return url;
  }, [search.filter]);

  useEffect(() => {
    var url = getSearch();
    router.push(url, { scroll: false });
  }, [getSearch]);

  if (!mount) return <ListingFilterLoading />;
  return (
    <div className="grid gap-y-4 my-3 h-full md:h-auto">
      <FilterSection classNames="lg:shadow-card p-3 lg:block hidden" />
      <div className="lg:shadow-card p-3">
        <FilterLocation />
      </div>
      {/* <div className="lg:shadow-card p-3">
        <FilterTypes />
      </div> */}
      <div className="lg:shadow-card p-3">
        <FilterPrice />
      </div>
      <div className="lg:shadow-card p-3">
        <FilterCountry />
      </div>
      <div className="lg:shadow-card p-3">
        <FilterDuration />
      </div>
    </div>
  );
};

export default Filter;
