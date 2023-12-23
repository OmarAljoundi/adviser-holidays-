import React, { FunctionComponent, useEffect } from "react";
import FilterHeader from "./filter-header";
import { CalendarClock, User } from "lucide-react";
import { DAYSFILTER, cn, daysFilter } from "@/lib/utils";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useCustomerFilter } from "@/hooks/use-customer-filter";
import qs from "query-string";
import { useSearchParams } from "next/navigation";

interface FilterDurationProps {}

const FilterDuration: FunctionComponent<FilterDurationProps> = () => {
  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);
  const filter = useCustomerFilter();
  const searchParams = useSearchParams();
  useEffect(() => {
    filter.onAdd({
      ...filter.filter,
      days: groupSelected,
    });
  }, [groupSelected]);

  useEffect(() => {
    const query = qs.parseUrl(window.location.href, {
      arrayFormat: "comma",
      decode: true,
    }).query;

    if (typeof query.days == "string") query.days = [query.days];
    if (query.days && query.days.length > 0) {
      const labelSet = new Set(query.days);
      const filteredObjects = daysFilter.filter((obj) =>
        labelSet.has(obj.value)
      );
      setGroupSelected(filteredObjects.map((x) => x.value));
    } else {
      setGroupSelected([]);
    }
  }, [searchParams.get("days")]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="عدد الأيام" icon={CalendarClock} divider />
      <CheckboxGroup
        value={groupSelected}
        //@ts-ignore
        onChange={setGroupSelected}
        classNames={{
          base: "w-full",
        }}
      >
        {DAYSFILTER.map((type) => (
          <Checkbox
            key={type.label}
            aria-label={type.label}
            classNames={{
              base: cn(
                "inline-flex max-w-md w-full bg-content1 m-0",
                "hover:bg-content2 items-center justify-start",
                "cursor-pointer rounded-lg gap-2 px-2 py-1 border-2 border-transparent",
                "data-[selected=true]:bg-content2"
              ),
              label: "w-full",
            }}
            value={type.value}
          >
            <div className="w-full flex justify-between gap-2 ">
              {type.label}
            </div>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default FilterDuration;
