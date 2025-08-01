"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, daysFilter } from "@/lib/utils";
import { CheckIcon, ChevronDown, X } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";

const DurationDropdown = () => {
  const [selected, setSelected] = useState<
    { value: string; label: string; period: number[] }[]
  >([]);

  const [days, setDays] = useQueryState(
    "days",
    parseAsArrayOf(parseAsString)
      .withDefault(selected.map((x) => x.label) ?? [])
      .withOptions({
        clearOnDefault: false,
        scroll: false,
        throttleMs: 0,
        history: "push",
      })
  );

  useEffect(() => {
    if (days && days.length > 0) {
      const labelSet = new Set(days);
      const filteredObjects = daysFilter.filter((obj) =>
        labelSet.has(obj.label)
      );
      setSelected(filteredObjects);
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-left w-full font-primary  cursor-pointer rounded-full flex justify-between flex-row-reverse border-0 text-sm"
        >
          <ChevronDown className="ml-2 h-4 w-4" />
          {selected.length > 0 ? (
            <React.Fragment>
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden text-white font-primary"
                onClick={() => {
                  setSelected([]);
                  setDays([]);
                }}
              >
                {selected.length} مختارة
                <X className="border  rounded-lg w-4 h-4 mr-2  bg-red-500/70" />
              </Badge>
              <div className="hidden lg:flex gap-2">
                {selected.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal font-primary"
                    onClick={() => {
                      setSelected([]);
                      setDays([]);
                    }}
                  >
                    {selected.length} مختارة
                    <X className="border  rounded-lg w-4 h-4 mr-2  bg-red-500/70" />
                  </Badge>
                ) : (
                  daysFilter
                    .filter((option) => selected.includes(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.label}
                        className="rounded-sm px-1 font-normal  text-[10px] font-primary"
                        onClick={() => {
                          const newData = selected.filter((x) => x != option);
                          setSelected(newData);
                          setDays(newData.map((x) => x.label));
                        }}
                      >
                        {option.label}
                        <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
                      </Badge>
                    ))
                )}
              </div>
            </React.Fragment>
          ) : (
            <span className="font-primary"> مدة الرحلة</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[200px] p-0")} align="start">
        <Command>
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {daysFilter.map((option) => {
                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => {
                      if (selected.includes(option)) {
                        const newData = selected.filter((x) => x != option);
                        setSelected(newData);
                        setDays(newData.map((x) => x.label));
                      } else {
                        const newData = [...selected, option];
                        setSelected(newData);
                        setDays(newData.map((x) => x.label));
                      }
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500",
                        selected?.includes(option) ? "opacity-100" : "opacity-0"
                      )}
                    />

                    <span className="font-naskh">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selected.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => {
                      setSelected([]);
                      setDays([]);
                    }}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DurationDropdown;
