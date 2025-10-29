/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Order {
  id: number;
  orderNo: string;
  status: string;
  assignedTo: string;
  date: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Cutting Pending":
      return "bg-yellow-100 text-yellow-800";
    case "In Production":
      return "bg-blue-100 text-blue-800";
    case "Quality Check":
      return "bg-purple-100 text-purple-800";
    case "Ready for Delivery":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


const statusOptions = [
  "Cutting Pending",
  "In Production",
  "Quality Check",
  "Ready for Delivery",
];


export const StatusCell = ({ row }: { row: any }) => {
  const [status, setStatus] = useState<string>(row.original.status);

  return (
    <Select
      value={status}
      onValueChange={(value) => {
        setStatus(value);
        console.log(`Order ${row.original.orderNo} status changed to:`, value);
      }}
    >
      <SelectTrigger
        className={`w-[180px] h-8 text-xs font-medium rounded-full border-none focus:ring-2 focus:ring-purple-500 ${getStatusColor(
          status
        )}`}
      >
        <SelectValue placeholder={status} />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-md border border-zinc-200 rounded-md">
        {statusOptions.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
            className="text-sm hover:bg-purple-50"
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};


export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "orderNo",
    header: "Order No",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
