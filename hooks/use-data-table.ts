import {
  ColumnFiltersState,
  ColumnOrderState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  TableOptions,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React from "react";

type UseDataTableProps<TData> = Omit<
  TableOptions<TData>,
  "getCoreRowModel" | "manualFiltering" | "manualPagination" | "manualSorting"
>;

export function useDataTable<TData>({ ...props }: UseDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(props.initialState?.columnVisibility ?? {});
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<any>([]);

  const table = useReactTable({
    ...props,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnOrderChange: setColumnOrder,

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),

    onColumnVisibilityChange: setColumnVisibility,

    initialState: {
      pagination: { pageSize: 10 },
      ...props.initialState,
    },
  });

  return { table };
}
