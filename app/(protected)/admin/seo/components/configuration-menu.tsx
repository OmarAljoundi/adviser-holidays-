"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { seoMenuItems } from "./lib";

export function ConfigurationMenu({ children }: { children: ReactNode }) {
  return (
    <Tabs
      defaultValue={"HomeSeo"}
      orientation="vertical"
      className="flex w-full gap-6 items-start relative"
    >
      <div className="sticky top-0 w-72 mt-[65px]">
        <TabsList className="flex-col gap-1 px-1 py-0 text-foreground flex-grow-0 w-full bg-card border border-border rounded-lg h-full p-6 ">
          {Object.entries(seoMenuItems).map(([key, o]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5
               hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent 
               p-2
               data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
            >
              <o.icon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              {o.value}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div className="w-full rounded-lg text-start">{children}</div>
    </Tabs>
  );
}
