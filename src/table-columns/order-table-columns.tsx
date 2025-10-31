import type { ColumnDef } from "@tanstack/react-table";
import { StatusCell } from "./StatusCell";

import type { Order } from "@/table-types/order-table";

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },

  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    accessorKey: "date",
    header: "Dead line",
  },
];
