import type { Table } from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-2 bg-inherit border-t border-zinc-300 rounded-b-xl">
      {/* Rows per page */}
      <div className="flex items-center space-x-2">
        <p className="text-xs font-medium text-zinc-600 whitespace-nowrap">
          Rows per page
        </p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="h-7 w-[70px] bg-zinc-300 text-zinc-900 border border-zinc-500 hover:border-zinc-400 text-xs">
            <SelectValue
              placeholder={`${table.getState().pagination.pageSize}`}
            />
          </SelectTrigger>
          <SelectContent
            side="top"
            className="bg-zinc-200 text-zinc-900 border border-zinc-400"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                className="text-xs hover:bg-zinc-300"
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Page info */}
      <div className="text-xs text-zinc-600 font-medium text-center">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          className="hidden sm:flex h-7 w-7 p-0 bg-zinc-950/80 border border-zinc-600/50 text-zinc-300 hover:bg-zinc-800/70"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="outline"
          className="h-7 w-7 p-0 bg-zinc-950/80 border border-zinc-600/50 text-zinc-300 hover:bg-zinc-800/70"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="outline"
          className="h-7 w-7 p-0 bg-zinc-950/80 border border-zinc-600/50 text-zinc-300 hover:bg-zinc-800/70"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="outline"
          className="hidden sm:flex h-7 w-7 p-0 bg-zinc-950/80 border border-zinc-600/50 text-zinc-300 hover:bg-zinc-800/70"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
