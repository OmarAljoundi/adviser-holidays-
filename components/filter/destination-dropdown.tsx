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
import { CheckIcon, ChevronDown, X } from "lucide-react";
import { QueryLocationSchema } from "@/schema";
import Link from "next/link";
import { cn, getDestinationNextRoute } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import React, { useMemo } from "react";

const DestinationDropdown = ({
  destinations,
}: {
  destinations: QueryLocationSchema[];
}) => {
  const { destination } = useParams();
  const select = decodeURIComponent(destination as string);
  const selectedDest = useMemo(() => {
    if (select) {
      return destinations.find((x) => x.slug == select);
    }
  }, [select]);

  const route = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-left w-full shadow-none  cursor-pointer col-span-2 lg:col-span-1  font-primary rounded-full flex justify-between flex-row-reverse  border-0"
        >
          <ChevronDown className="ml-2 h-4 w-4" />

          {selectedDest ? (
            <React.Fragment>
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal  text-[10px] font-primary"
                onClick={() => route.push("/tour-listing")}
              >
                {selectedDest?.name}
                <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
              </Badge>
            </React.Fragment>
          ) : (
            <span className="font-primary"> الوجهات</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty className="font-primary">لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {destinations.map((option) => {
                return (
                  <Link key={option.id} href={getDestinationNextRoute(option)}>
                    <CommandItem>
                      <CheckIcon
                        className={cn(
                          "ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500",
                          option.slug == select ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="font-primary">{option.name}</span>
                    </CommandItem>
                  </Link>
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
