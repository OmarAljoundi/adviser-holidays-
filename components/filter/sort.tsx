"use client";
import { FunctionComponent, useEffect, useState } from "react";
import CustomSelect from "../next-ui/custom-select";
import { Button, Select, SelectItem, Selection } from "@nextui-org/react";
import { ORDERFILTER } from "@/lib/utils";
import qs from "query-string";
import { Order } from "@/types/search";
import { useSearchParams } from "next/navigation";
import { useCustomerFilter } from "@/hooks/use-customer-filter";

interface SortProps {}

const Sort: FunctionComponent<SortProps> = () => {
  const [values, setValues] = useState<Selection>(new Set([]));
  const filter = useCustomerFilter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const data = Array.from(values);
    if (data.length > 0) {
      const result = ORDERFILTER.find((x) => x.label == data[0]);
      if (result) {
        filter.onAdd({
          ...filter.filter,
          sortMemebr: result.value,
          sortOrder: result.order,
        });
      }
    }
  }, [values]);

  useEffect(() => {
    const query = qs.parseUrl(window.location.href, {
      arrayFormat: "comma",
      decode: true,
    }).query;

    if (query.sortOrder && query.sortMemebr) {
      const currentSort = ORDERFILTER.find(
        (x) =>
          x.order == (query.sortOrder as unknown as Order) &&
          x.value == query.sortMemebr
      );
      if (currentSort?.label) {
        setValues(new Set([currentSort?.label]));
        return;
      }
    }
    setValues(new Set([]));
  }, [searchParams.get("sortMemebr"), searchParams.get("sortOrder")]);

  return (
    <div className="flex gap-x-2">
      <div>
        <Select
          selectionMode="single"
          selectedKeys={values}
          className="w-36 lg:w-44"
          onSelectionChange={setValues}
          isMultiline
          variant="bordered"
          items={ORDERFILTER}
          placeholder="الترتيب حسب"
          size="sm"
          classNames={{
            base: "p-0 ",
            mainWrapper: "p-0",
            value: "mr-4",
            trigger: "min-h-fit",
          }}
        >
          {(order) => (
            <SelectItem key={order.label} value={order.label}>
              {order.label}
            </SelectItem>
          )}
        </Select>
      </div>
    </div>
  );
};

export default Sort;
