import StitchingAction from "@/columns-dropdown/StitchingActiom";

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
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <StitchingAction rowData={row.original} />,
  },
];
