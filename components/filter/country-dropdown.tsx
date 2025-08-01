"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, X, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import Image from "next/image";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { europeanCountries } from "@/lib/constants";

const CountryDropdown = () => {
  const [selected, setSelected] = useState<
    { countryCode: string; label: string }[]
  >([]);

  const [country, setCountry] = useQueryState(
    "country",
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
    if (country && country.length > 0) {
      const labelSet = new Set(country);
      const filteredObjects = europeanCountries.filter((obj) =>
        labelSet.has(obj.label)
      );
      setSelected(filteredObjects);
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
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
                  setCountry([]);
                }}
              >
                {selected.length} مختارة
                <X className="border  rounded-lg w-4 h-4 mr-2  bg-red-500/70" />
              </Badge>
              <div className="hidden lg:flex gap-2">
                {selected.length > 4 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal font-primary"
                    onClick={() => {
                      setSelected([]);
                      setCountry([]);
                    }}
                  >
                    {selected.length} مختارة
                    <X className="border  rounded-lg w-4 h-4 mr-2  bg-red-500/70" />
                  </Badge>
                ) : (
                  europeanCountries
                    .filter((option) => selected.includes(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.label}
                        className="rounded-sm px-1 font-normal  text-[10px] font-primary"
                        onClick={() => {
                          const newData = selected.filter((x) => x != option);
                          setSelected(newData);
                          setCountry(newData.map((x) => x.label));
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
            <span className="font-primary"> اختار الدولة</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder={"ابحث عن الدولة"}
            className="ml-4 placeholder:font-primary placeholder:text-xs"
          />
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {europeanCountries.map((option) => {
                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => {
                      if (selected.includes(option)) {
                        const newData = selected.filter((x) => x != option);
                        setSelected(newData);
                        setCountry(newData.map((x) => x.label));
                      } else {
                        const newData = [...selected, option];
                        setSelected(newData);
                        setCountry(newData.map((x) => x.label));
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500",
                        selected.includes(option) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <Image
                      src={`https://flagcdn.com/48x36/${option.countryCode.toLowerCase()}.png`}
                      width={48}
                      height={36}
                      alt={option.countryCode}
                      fetchPriority="high"
                      loading="eager"
                      className="ml-2 h-4 w-4 text-muted-foreground"
                    />
                    <span className="font-primary">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selected.length > 0 && (
              <React.Fragment>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => {
                      setSelected([]);
                      setCountry([]);
                    }}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </React.Fragment>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryDropdown;
