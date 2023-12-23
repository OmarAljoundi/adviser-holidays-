"use client";
import { FunctionComponent, useEffect, useState } from "react";
import { Banknote } from "lucide-react";
import FilterHeader from "./filter-header";
import { Input } from "@nextui-org/react";
import useDebounce from "@/hooks/useDebounce";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";
import { useCustomerFilter } from "@/hooks/use-customer-filter";
interface FilterPriceProps {}

const FilterPrice: FunctionComponent<FilterPriceProps> = () => {
  const filter = useCustomerFilter();
  const [value, setValue] = useState<any[]>([0, 1800]);
  const debunce = useDebounce(value, 500);
  const searchParams = useSearchParams();
  useEffect(() => {
    filter.onAdd({
      ...filter.filter,
      minprice: debunce && debunce.length > 0 ? debunce[0] : null,
      maxprice: debunce && debunce.length > 1 ? debunce[1] : null,
    });
  }, [debunce]);

  useEffect(() => {
    const query = qs.parseUrl(window.location.href, {
      arrayFormat: "comma",
      decode: true,
    }).query;

    var price = [...value];
    if (query.minprice) {
      price[0] = Number(query.minprice);
    } else {
      price[0] = undefined;
    }
    if (query.maxprice) {
      price[1] = Number(query.maxprice);
    } else {
      price[1] = undefined;
    }
    setValue(price);
  }, [searchParams.get("maxprice"), searchParams.get("minprice")]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="السعر" icon={Banknote} />
      <div className="px-4">
        <Slider
          defaultValue={value}
          max={1800}
          step={1}
          onValueChange={(e: number[]) => setValue(e)}
        />
      </div>
      <div className="flex gap-x-2 mt-10">
        <Input
          classNames={{ label: "right-0 text-xs" }}
          variant="bordered"
          isReadOnly
          value={value[1]?.toString() || ""}
          dir="ltr"
          size="sm"
          label="السعر الأعلى"
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">USD</span>
            </div>
          }
        />
        <Input
          classNames={{ label: "right-0 text-xs" }}
          variant="bordered"
          isReadOnly
          size="sm"
          value={value[0]?.toString() || ""}
          dir="ltr"
          label="السعر الأدنى"
          labelPlacement="outside"
          endContent={
            <div className="pointer-events-none flex items-center border-r pr-2">
              <span className="text-default-400 text-small">USD</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default FilterPrice;
