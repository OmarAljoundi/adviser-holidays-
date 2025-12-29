import React, { ReactNode } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { ModeToggle } from "./mode-toggle";

export type BreadcrumList = {
  item: string;
  url?: string;
  currentPage?: boolean;
};

export default function ContentWrapper({
  children,
  breadcrumbs,
}: {
  children: ReactNode;
  breadcrumbs: Array<BreadcrumList>;
}) {
  return (
    <React.Fragment>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map(({ item, currentPage, url }) => {
                if (!currentPage) {
                  return (
                    <React.Fragment key={item}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={url ?? ""}>{item}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </React.Fragment>
                  );
                }
                return (
                  <BreadcrumbItem key={item}>
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </React.Fragment>
  );
}
