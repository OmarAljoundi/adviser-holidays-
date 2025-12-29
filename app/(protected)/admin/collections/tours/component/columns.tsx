"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { QueryTourSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { UpdateTourStatus } from "./update-tour-status";
import {
  ActionItem,
  ActionsRow,
  DeleteAction,
  RedirectActionItem,
} from "@/components/action-row";
import { tourDelete } from "@/server/tours.server";

export function getTourColumns(): ColumnDef<QueryTourSchema>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tour Name" />
      ),
      cell: ({ row }) => {
        return (
          <div>
            <span className=" truncate line-clamp-1 font-arabic-body">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return row.original.name?.includes(value) || false;
      },
    },
    {
      accessorKey: "startDay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start Day" />
      ),
      cell: ({ row }) => {
        return (
          <div className="w-40 flex items-center justify-start font-arabic-body">
            {row.original.startDay?.slice(0, 1)?.map((item) => (
              <Badge
                className="px-2 rounded-none font-arabic-body"
                variant={"outline"}
                key={item}
              >
                {item}
              </Badge>
            ))}
            {row.original.startDay && row.original.startDay?.length > 2 && (
              <Badge className="px-2 rounded-none" variant={"outline"}>
                + {row.original.startDay.length - 1}
              </Badge>
            )}
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return (
          row.original.startDay?.filter((x) => (value as string[]).includes(x))
            ?.length > 0 || false
        );
      },
    },
    {
      accessorKey: "priceDouble",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price Double" />
      ),
      cell: ({ row }) => {
        return (
          <div className="w-32 flex items-center justify-between">
            <span className="max-w-[6rem] truncate">
              {row.getValue("priceDouble")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "numberOfDays",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="#Of days" />
      ),
      cell: ({ row }) => (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">
            {row.getValue("numberOfDays")}
          </span>
        </div>
      ),
      filterFn: () => {
        return true;
      },
    },
    {
      accessorKey: "tourType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => (
        <div className="w-32 flex items-center justify-between font-arabic-body">
          {row.original.tourType ? (
            <Badge className="max-w-[6rem] truncate font-arabic-body">
              {row.original.tourType?.name}
            </Badge>
          ) : (
            <Badge variant={"outline"} className="max-w-[6rem] truncate">
              No type
            </Badge>
          )}
        </div>
      ),
      filterFn: (row, id, value) => {
        return (value as string[]).includes(row.original.tourType?.name ?? "");
      },
    },
    {
      accessorKey: "slug",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Url" />
      ),
      cell: ({ row }) => {
        if (row.original.slug) {
          return (
            <div className="w-auto flex items-center justify-between">
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/tour/${row.original.slug}`}
              >
                <Button
                  trailingIcon={<ExternalLink className="size-4" />}
                  size="sm"
                  variant="outline"
                >
                  <span className="w-24 truncate text-ellipsis overflow-hidden text-xs">
                    Visit Page
                  </span>
                </Button>
              </Link>
            </div>
          );
        }
        return (
          <div className="w-auto flex items-center justify-between">
            <Button
              trailingIcon={<AlertCircle />}
              size="sm"
              color="primary"
              variant="outline"
            >
              <span className="w-24 truncate text-ellipsis overflow-hidden">
                Need to set slug!
              </span>
            </Button>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return (value as string[]).includes(row.original.slug ?? "");
      },
      size: 180,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <UpdateTourStatus row={row.original} />,
      filterFn: (row, value) => {
        if (value == "Published" && row.original.isActive == true) return true;
        if (value == "Draft" && row.original.isActive == false) return true;

        return false;
      },
    },
    {
      accessorKey: "createdAt",
      sortingFn: "datetime",
      sortDescFirst: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="CreatedAt" />
      ),
      cell: ({ row }) => (
        <div className="w-[100px] truncate">
          {format(new Date(row.original.createdAt!), "yyyy-MM-dd")}
        </div>
      ),
      filterFn: (row, id, value) => {
        let from = true;
        let to = true;
        if (value?.from) {
          from =
            new Date(value.from as string) <= new Date(row.original.createdAt!);
        }
        if (value?.to) {
          to =
            new Date(value.to as string) >= new Date(row.original.createdAt!);
        }

        return from && to;
      },
    },

    {
      id: "actions",

      cell: function Cell({ row: { original } }) {
        const route = useRouter();
        return (
          <ActionsRow gap="xs">
            <ActionItem
              icon={Copy}
              type="redirect"
              url={`/admin/collections/tours/${original.id}/duplicate`}
            />
            <RedirectActionItem
              url={`/admin/collections/tours/${original.id}`}
            />
            <DeleteAction
              itemName={original.name}
              deleteFunction={() => tourDelete({ where: { id: original.id } })}
              onSuccess={() => route.refresh()}
            />
          </ActionsRow>
        );
      },
      size: 40,
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
