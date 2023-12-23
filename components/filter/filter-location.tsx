import { FunctionComponent, useEffect } from "react";
import FilterHeader from "./filter-header";
import { Radio, RadioGroup, Skeleton } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCustomerFilter } from "@/hooks/use-customer-filter";
import { useDestination } from "@/hooks/react-query/use-destination";
import { useQuery } from "@tanstack/react-query";
import { REVALIDATE_LOCATION_LIST } from "@/lib/keys";
import { getDestination } from "@/lib/operations";

interface FilterLocationProps {}

const FilterLocation: FunctionComponent<FilterLocationProps> = () => {
  const { data, isLoading } = useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestination(),
  });
  const { destination } = useParams();
  const filter = useCustomerFilter();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    filter.onClear();
  }, [pathname]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="الوجهة السياحية" divider />
      {isLoading &&
        Array.from(new Array(6)).map((o) => (
          <div className="max-w-[300px] w-full flex items-center gap-3" key={o}>
            <div>
              <Skeleton className="flex rounded-medium w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        ))}
      <RadioGroup
        onChange={(e) => {
          if (e.target.value == "All") {
            route.push(`/tour-listing`, { scroll: true });
          } else {
            route.push(`/tour-listing/${e.target.value}`, { scroll: true });
          }
        }}
        defaultValue={decodeURIComponent(destination as string)}
      >
        <Radio
          value={"All"}
          key={"All"}
          classNames={{
            base: cn(
              "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
              "flex-row-reverse max-w-full w-full cursor-pointer rounded-lg gap-4 px-2 py-1 border-2 border-transparent",
              "data-[selected=true]:bg-content2"
            ),
          }}
        >
          عرض جميع الوجهات
        </Radio>
        {data?.results?.map((dest) => (
          <Radio
            value={dest.slug!}
            key={dest.id}
            classNames={{
              base: cn(
                "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                "flex-row-reverse max-w-full w-full cursor-pointer rounded-lg gap-4 px-2 py-1 border-2 border-transparent",
                "data-[selected=true]:bg-content2"
              ),
            }}
          >
            {dest.name}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterLocation;
