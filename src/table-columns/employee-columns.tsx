import type { ColumnDef } from "@tanstack/react-table";

import type { Employee } from "@/table-types/employee-table";

import EmployeeAction from "@/columns-dropdown/EmployeeAction";

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    header: "Employee ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Garment Types",
    accessorKey: "garment_types",
    cell: ({ getValue }) => {
      const types = getValue<string[]>();
      return (
        <div className="flex flex-wrap gap-1">
          {types.map((type, i) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({row}) => <EmployeeAction rowData={row.original} />,
  },
];
