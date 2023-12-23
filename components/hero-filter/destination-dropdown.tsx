"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { REVALIDATE_LOCATION_LIST } from "@/lib/keys";
import { getDestination } from "@/lib/operations";
import { useCustomerFilter } from "@/hooks/use-customer-filter";

const DestinationDropdown = () => {
  const { data: locations } = useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestination(),
  });

  const { onAdd, filter } = useCustomerFilter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-left w-full  cursor-pointer"
        >
          {filter?.location ? (
            <Badge
              variant="secondary"
              className="rounded-sm px-1 font-normal truncate"
              onClick={() => {
                onAdd({
                  ...filter,
                  location: null,
                });
              }}
            >
              {locations?.results?.find((x) => x.slug == filter.location)?.name}
              <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
            </Badge>
          ) : (
            <>
              <Plus className="ml-2 h-4 w-4" />
              <span>الأقسام</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {locations?.results
                ?.filter((x) => x.is_active)
                .map((option) => {
                  return (
                    <CommandItem
                      key={option.slug}
                      onSelect={() => {
                        onAdd({
                          ...filter,
                          location: option.slug,
                        });
                      }}
                    >
                      <Check
                        className={cn(
                          "ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500",
                          filter?.location == option.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />

                      <span>{option.name}</span>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DestinationDropdown;
