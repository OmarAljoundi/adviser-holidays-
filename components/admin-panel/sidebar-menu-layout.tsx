"use client";
import { ChevronRight, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React, { ReactNode, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { authClient } from "@/auth-client";
import { CollectionIcon } from "../icons/collection-icon";
import { ContactIcon } from "../icons/contact-icon";
import { ServicesIcon } from "../icons/services-icon";
import { SettingsIcon } from "../icons/settings-icon";
import { SearchIcon } from "../icons/search-icon";
import { AirplaneIcon } from "../icons/airplane-icon";

const data = {
  user: {
    name: "admin",
    email: "admin@admin.com",
  },
  navMain: [
    {
      url: "/admin/collections",
      title: "Collections",
      icon: <CollectionIcon className="hover:bg-transparent" />,
      items: [
        {
          url: "/admin/collections/tours",
          title: "Tours",
        },
        {
          url: "/admin/collections/tour-types",
          title: "Tour types",
        },
      ],
    },
    {
      url: "/admin/destinations",
      title: "Destinations",
      icon: <AirplaneIcon className="hover:bg-transparent" />,
    },

    {
      url: "/admin/configuration",
      title: "Configuration",
      icon: <SettingsIcon className="hover:bg-transparent" />,
    },
    {
      url: "/admin/seo",
      title: "Seo",
      icon: <SearchIcon className="hover:bg-transparent" />,
    },
  ],
};

export function SidebarMenuLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const route = useRouter();
  const isActive = useCallback(
    (url: string) => {
      return pathname.startsWith(url);
    },
    [pathname]
  );

  const menuItem = useCallback(
    (item: {
      title: string;
      url: string;
      icon: ReactNode;
      items?: { title: string; url: string }[];
    }) => {
      if (item.items && item.items.length > 0) {
        return (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isActive(item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && item.icon}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive(subItem.url)}
                      >
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      }
      return (
        <Link href={item.url}>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={isActive(item.url)}
            >
              {item.icon && item.icon}

              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>
      );
    },
    [isActive]
  );

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="hover:bg-transparent"
              >
                <Link href="/admin" className="flex">
                  <div>
                    <Image
                      src={"/main-logo.png"}
                      className={cn("block dark:hidden")}
                      width={80}
                      height={50}
                      alt="main-logo-dark"
                    />
                    <Image
                      src={"/main-logo.png"}
                      className={cn("hidden dark:block")}
                      width={80}
                      height={50}
                      alt="main-logo-light"
                    />
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <React.Fragment key={`${item.title}-${item.url}`}>
                  {menuItem(item)}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage alt={data.user.name} />
                      <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage alt={data.user.name} />
                        <AvatarFallback className="rounded-lg">
                          AD
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {data.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={async () => {
                      await authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            route.refresh();
                            route.replace("/login");
                            route.refresh();
                          },
                        },
                      });
                    }}
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="overflow-auto">{children}</SidebarInset>
    </SidebarProvider>
  );
}
