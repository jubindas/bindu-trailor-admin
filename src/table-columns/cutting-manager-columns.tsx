import type { ColumnDef } from "@tanstack/react-table";
import type { CuttingOrder } from "@/table-types/cutting-manager";
import CuttingManagerAction from "@/columns-dropdown/CuttingManagerAction";

export const cuttingColumns: ColumnDef<CuttingOrder>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "garment",
    header: "Garment",
  },
  {
    accessorKey: "materials",
    header: "Materials",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.materials.map((mat, idx) => (
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
    accessorKey: "qty",
    header: "Qty",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const colorMap: Record<string, string> = {
        "Cutting Pending": "bg-yellow-100 text-yellow-800",
        "Cutting Done": "bg-green-100 text-green-800",
        Assigned: "bg-blue-100 text-blue-800",
        "In Progress": "bg-purple-100 text-purple-800",
      };
      return (
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            colorMap[status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => <CuttingManagerAction />,
  },
];
