import { DataTable } from "@/components/data-table";

import EmployeeDialog from "@/components/EmployeeDialog";

import { employees } from "@/data/employee-data";

import { employeeColumns } from "@/table-columns/employee-columns";
import { useState } from "react";

export default function Employee() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col bg-[#1F2937] p-4 rounded-lg mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#8C03E9] tracking-tight">
          Cutting Manager
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-sm text-[#8C03E9]">
            <span className="font-medium">Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Type to search..."
              className="border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all w-64"
            />
          </div>

          <div className="flex justify-end w-full md:w-auto">
            <EmployeeDialog mode="create" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        <DataTable
          data={filteredEmployees}
          columns={employeeColumns}
          enablePagination
        />
      </div>
    </div>
  );
}
