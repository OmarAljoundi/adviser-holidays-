import * as React from "react";
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";

import { getCommonPinningStyles } from "@/lib/data-table";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Input } from "../ui/input";

import { Search } from "lucide-react";
import { LoadingOverlay } from "../ui/loading-overlay";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: TanstackTable<TData>;
  floatingBar?: React.ReactNode | null;
  isPending?: boolean;
}

export function DataTable<TData>({
  table,
  floatingBar = null,
  children,
  className,
  isPending = false,
  ...props
}: DataTableProps<TData>) {
  return (
    <React.Fragment>
      <LoadingOverlay
        isLoading={isPending}
        spinnerClassName="size-12 w-full text-center"
        loadingText={"Refetching data..."}
      />
      <div
        className={cn("w-full space-y-2.5 overflow-auto p-2", className)}
        {...props}
      >
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search any value..."
                onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                className="peer max-w-md pe-9 ps-9"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Search size={16} strokeWidth={2} />
              </div>
            </div>
          </div>
          {children}
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          ...getCommonPinningStyles({
                            column: header.column,
                            isHeader: true,
                          }),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          ...getCommonPinningStyles({ column: cell.column }),
                          ...(cell.column.getIsPinned()
                            ? { borderRadius: 0 }
                            : {}),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-2.5">
          <DataTablePagination table={table} />
          {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
        </div>
      </div>
    </React.Fragment>
  );
}
