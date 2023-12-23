import { useStatic } from "@/hooks/use-static";
import {
  Avatar,
  Chip,
  Select,
  SelectItem,
  SelectedItems,
  Selection,
} from "@nextui-org/react";
import React, { FunctionComponent, useEffect } from "react";
import FilterHeader from "./filter-header";
import { TourType } from "@/types/custom";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { useTourTypes } from "@/hooks/react-query/use-tour-types";
import { useCustomerFilter } from "@/hooks/use-customer-filter";

interface FilterTypesProps {}

const FilterTypes: FunctionComponent<FilterTypesProps> = () => {
  const [values, setValues] = React.useState<Selection>(new Set([]));
  const filter = useCustomerFilter();
  const { data } = useTourTypes();
  const searchParams = useSearchParams();
  const RemoveKey = (key: string) => {
    const updatedValues = new Set(values);
    updatedValues.delete(key);
    setValues(updatedValues);
  };

  useEffect(() => {
    const valuesArray = Array.from(values) as string[];
    filter.onAdd({
      ...filter.filter,
      type: [...valuesArray],
    });
  }, [values]);

  useEffect(() => {
    const query = qs.parseUrl(window.location.href, {
      arrayFormat: "comma",
      decode: true,
    }).query;

    if (typeof query.type == "string") query.type = [query.type];
    if (query.type && query.type.length > 0) {
      const labelSet = new Set(query.type);
      const filteredObjects = data?.results?.filter((obj) =>
        labelSet.has(obj.name!)
      );
      setValues(new Set(filteredObjects?.map((x) => x.name!)));
    } else {
      setValues(new Set([]));
    }
  }, [searchParams.get("type")]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="نوع الرحلة" />
      <Select
        selectionMode="multiple"
        selectedKeys={values}
        onSelectionChange={setValues}
        isMultiline
        variant="bordered"
        items={data?.results || []}
        placeholder="أخنار نوع الرحلة"
        size="md"
        disabledKeys={values}
        renderValue={(items: SelectedItems<TourType>) => {
          return (
            <div className="flex gap-2 w-full flex-wrap ">
              {items.map((type) => (
                <Chip
                  key={type.key}
                  size="sm"
                  isCloseable
                  onClose={() => RemoveKey(type.data?.name!)}
                >
                  {type.data?.name!}
                </Chip>
              ))}
            </div>
          );
        }}
        classNames={{
          value: "flex items-center justify-start gap-2 mr-6",
        }}
      >
        {(type) => (
          <SelectItem key={type.name!} textValue={type.name}>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Avatar
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${type.image!}`}
                  className="flex-shrink-0"
                  size="sm"
                  alt={type.name!}
                />
                <div className="flex flex-col">
                  <span className="text-small">{type.name!}</span>
                </div>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default FilterTypes;
