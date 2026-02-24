import type { Stitching } from "@/table-types/stitching-order";

import type { ColumnDef } from "@tanstack/react-table";

export const stitchingColumnsComplete: ColumnDef<Stitching>[] = [
  {

    header: "Sl No",
    cell: ({ row }) => row.index + 1,
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
    cell: ({ row }) => (
      <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md font-medium">
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
];
