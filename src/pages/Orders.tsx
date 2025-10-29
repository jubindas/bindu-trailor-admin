
import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { orders } from "@/data/dummy-data";

import { ordersColumns } from "@/table-columns/order-table-columns";

export default function Orders() {
  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col bg-[#1F2937]  p-4 rounded-lg mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#8C03E9] tracking-tight">
          Order Status Tracking
        </h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-purple-300 rounded-md px-3 py-2 text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150"
        >
          <option>All</option>
          <option>Cutting Pending</option>
          <option>In Production</option>
          <option>Quality Check</option>
          <option>Ready for Delivery</option>
        </select>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        <DataTable
          data={filteredOrders}
          columns={ordersColumns}
          enablePagination
        />
      </div>

      {filteredOrders.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No orders found.</p>
      )}
    </div>
  );
}
