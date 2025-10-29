import { DataTable } from "@/components/data-table";

import { cuttingOrders } from "@/data/cutting-manager-data";

import { cuttingColumns } from "@/table-columns/cutting-manager-columns";

export default function CuttingManager() {
  return (
    <div className="min-h-screen p-6 ">
      <div className="flex flex-col bg-[#1F2937]  p-4 rounded-lg mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#8C03E9] tracking-tight">
          Cutting Manager
        </h1>

        <div className="flex items-center gap-2 text-sm text-[#8C03E9]">
          <span className="font-medium">Search:</span>
          <input
            type="text"
            placeholder="Type to search..."
            className="border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all w-64"
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        <DataTable
          data={cuttingOrders}
          columns={cuttingColumns}
          enablePagination
        />
      </div>
    </div>
  );
}
