import { FunctionComponent, useEffect, useState } from "react";
import FilterHeader from "./filter-header";
import {
  Avatar,
  Chip,
  Select,
  SelectItem,
  SelectedItems,
  Selection,
} from "@nextui-org/react";
import { COUNTIRESLIST } from "@/lib/utils";
import qs from "query-string";
import { useSearchParams } from "next/navigation";
import { useCustomerFilter } from "@/hooks/use-customer-filter";
interface FilterCountryProps {}

const FilterCountry: FunctionComponent<FilterCountryProps> = () => {
  const [values, setValues] = useState<Selection>(new Set([]));
  const filter = useCustomerFilter();
  const searchParams = useSearchParams();
  const RemoveKey = (key: string) => {
    const updatedValues = new Set(values);
    updatedValues.delete(key);
    setValues(updatedValues);
  };

  useEffect(() => {
    const valuesArray = Array.from(values);
    filter.onAdd({
      ...filter.filter,
      country: [...valuesArray],
    });
  }, [values]);

  useEffect(() => {
    const query = qs.parseUrl(window.location.href, {
      arrayFormat: "comma",
      decode: true,
    }).query;

    if (typeof query.country == "string") query.country = [query.country];
    if (query.country && query.country.length > 0) {
      const labelSet = new Set(query.country);
      const filteredObjects = COUNTIRESLIST.filter((obj) =>
        labelSet.has(obj.label)
      );
      setValues(new Set(filteredObjects.map((x) => x.label)));
    } else {
      setValues(new Set([]));
    }
  }, [searchParams.get("country")]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <FilterHeader title="البلد المفضل" />
      <Select
        selectionMode="multiple"
        selectedKeys={values}
        onSelectionChange={setValues}
        isMultiline
        variant="bordered"
        placeholder="أخنار البلد المفضلة"
        size="md"
        disabledKeys={values}
        items={COUNTIRESLIST}
        renderValue={(
          items: SelectedItems<{ label: string; countryCode: string }>
        ) => {
          return (
            <div className="flex gap-2 w-full flex-wrap ">
              {items.map((type) => (
                <Chip
                  key={type.key}
                  size="sm"
                  isCloseable
                  onClose={() => RemoveKey(type.data!.label)}
                >
                  {type.data?.label}
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
          <SelectItem key={type.label} textValue={type.label}>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Avatar
                  src={`https://flagcdn.com/48x36/${type.countryCode.toLowerCase()}.png`}
                  className="flex-shrink-0 w-6 h-6"
                  size="sm"
                  alt={type.label!}
                />
                <div className="flex flex-col">
                  <span className="text-small">{type.label}</span>
                </div>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default FilterCountry;
