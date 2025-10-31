/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Stitching } from "@/table-types/stitching-order";

import type { ColumnDef } from "@tanstack/react-table";

export const stitchingColumns: ColumnDef<Stitching>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "garmentType",
    header: "Garment Type",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "metarialCode",
    header: "Material Code",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.metarialCode.map((mat, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-md"
          >
            {mat}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const [status, setStatus] = useState<string>(row.original.status);

      const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        console.log(
          `Status for ${row.original.orderId} changed to:`,
          newStatus
        );
      };

      return (
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[150px] bg-[#1F2937] border border-[#374151] text-gray-200">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent className="bg-[#1F2937] text-gray-200 border-[#374151]">
            <SelectItem value="Cutting Pending">Pending</SelectItem>
            <SelectItem value="In Production">In Production</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
];
