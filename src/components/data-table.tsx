import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import type {
  ColumnFiltersState,
  SortingState,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/table-pagination";
import { useState } from "react";
import DataTableFilter from "./data-table-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enablePagination?: boolean;
  hideTableInPrint?: boolean;
  filterOptions?: {
    enableFilter: boolean;
    filterPlaceholder: string;
    filterCol: string;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterOptions,
  enablePagination = false,
  hideTableInPrint = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  });

  return (
    <div
      className={`${
        hideTableInPrint ? "print:hidden" : ""
      } border rounded-xl overflow-hidden shadow-lg bg-[#E4C6FF]`}
    >
      {filterOptions?.enableFilter && (
        <div className="flex w-full px-4 py-3 bg-[#E4C6FF] border-b border-[#d2aefb]">
          <DataTableFilter
            table={table}
            placeholder={filterOptions.filterPlaceholder}
            filterCol={filterOptions.filterCol}
          />
        </div>
      )}

      <Table className="">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-linear-to-r from-[#3F3F47] to-[#1F2937] text-white"
            >
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={`text-white text-xs font-semibold uppercase tracking-wider py-4 px-6 text-left
                    ${index === 0 ? "rounded-tl-xl" : ""}
                    ${
                      index === headerGroup.headers.length - 1
                        ? "rounded-tr-xl"
                        : ""
                    }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`bg-[#8B71DB] hover:bg-[#e0b0ff] transition-all duration-200 ${
                  rowIndex !== table.getRowModel().rows.length - 1
                    ? "border-b border-[#cca6ff]"
                    : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-[#24024b] text-sm py-4 px-6"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-[#6118df]"
              >
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {enablePagination && (
        <div className="bg-[#6E11B0] border-t border-[#efe2ff]">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}
