import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { SelectedTours } from "./selected-tours";
import { FormValues } from "./lib";
import { useQuery } from "@tanstack/react-query";
import { tourQuery } from "@/server/tours.server";
import { useDebounce } from "@/hooks/use-debounce";
import { CommandLoading } from "cmdk";

interface TourSelectorProps {
  activeTab: string;
}

const HighlightMatch = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) {
    return <React.Fragment>{text}</React.Fragment>;
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return (
    <React.Fragment>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span
            key={i}
            className="bg-yellow-100 text-yellow-900 rounded px-0.5 font-arabic-header"
          >
            {part}
          </span>
        ) : (
          <span key={i} className="font-arabic-header">
            {part}
          </span>
        )
      )}
    </React.Fragment>
  );
};

export function TourSelector({ activeTab }: TourSelectorProps) {
  const form = useFormContext<FormValues>();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    data: tours = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tours", debouncedSearchQuery],
    queryFn: async () => {
      return tourQuery({
        select: {
          id: true,
          name: true,
          images: true,
          tourType: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        where: debouncedSearchQuery
          ? {
              name: {
                contains: debouncedSearchQuery,
                mode: "insensitive",
              },
            }
          : undefined,
        orderBy: {
          name: "asc",
        },
        take: 20,
      });
    },
    enabled: open,
  });

  const isSearching = isLoading || isFetching;

  return (
    <div className="flex-1 flex flex-col">
      <FormLabel className="mb-2">Tours</FormLabel>
      <Controller
        control={form.control}
        name={`attributes.${Number(activeTab)}.tours`}
        render={({ field }) => (
          <div className="space-y-2">
            <Popover
              open={open}
              onOpenChange={(openState) => {
                setOpen(openState);
                if (!openState) {
                  setSearchQuery("");
                }
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="justify-between w-full"
                >
                  {field.value.length > 0
                    ? `${field.value.length} tour${
                        field.value.length > 1 ? "s" : ""
                      } selected`
                    : "Select Tours"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0 direction-rtl"
                align="start"
              >
                <Command shouldFilter={false} className="rtl">
                  <CommandInput
                    placeholder="أبحث عن الرحلات"
                    className="placeholder:text-right placeholder:font-arabic-body font-arabic-body"
                    onValueChange={setSearchQuery}
                    dir="rtl"
                  />
                  <CommandList>
                    {isSearching && (
                      <CommandLoading>
                        <DefaultLoadingSkeleton />
                      </CommandLoading>
                    )}
                    <CommandEmpty>No tours found.</CommandEmpty>
                    <CommandGroup>
                      {tours.map((tour) => {
                        const isSelected = field.value.some(
                          (selected) => selected.id === tour.id
                        );
                        return (
                          <CommandItem
                            key={tour.id}
                            value={tour.name}
                            onSelect={() => {
                              if (isSelected) {
                                field.onChange(
                                  field.value.filter(
                                    (selected) => selected.id !== tour.id
                                  )
                                );
                              } else {
                                field.onChange([...field.value, tour]);
                              }
                            }}
                            className="flex items-center gap-2 py-2 px-2"
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex flex-col text-right flex-1">
                                <span className="font-medium font-arabic-header text-xs">
                                  <HighlightMatch
                                    text={tour.name}
                                    query={debouncedSearchQuery}
                                  />
                                </span>
                                {tour.tourType?.name && (
                                  <span className="text-xs font-arabic-body text-muted-foreground">
                                    {tour.tourType.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Check
                              className={cn(
                                "h-4 w-4 flex-shrink-0",
                                isSelected ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <SelectedTours
              field={{ onChange: field.onChange, value: field.value }}
            />
          </div>
        )}
      />
    </div>
  );
}

function DefaultLoadingSkeleton() {
  return (
    <CommandGroup>
      {[1, 2, 3].map((i) => (
        <CommandItem key={i} disabled>
          <div className="flex items-center gap-2 w-full">
            <div className="flex flex-col flex-1 gap-1 text-right">
              <div className="h-4 w-24 animate-pulse bg-muted rounded ml-auto" />
              <div className="h-3 w-16 animate-pulse bg-muted rounded ml-auto" />
            </div>
            <div className="h-6 w-6 rounded-full animate-pulse bg-muted" />
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
