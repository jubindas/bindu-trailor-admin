import { DataTable } from "@/components/data-table";

import { stitchingColumns } from "@/table-columns/stitching-columns";

import { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { StitchingContext } from "@/context/StitchingContext";
import { fetchWorkload } from "@/services/apiStitching";
import { BASE_URL } from "@/lib/url";

export default function Stitching() {

  const [searchTerm, setSearchTerm] = useState("");

  const { allItems, setItems } = useContext(StitchingContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["workload"],
    queryFn: fetchWorkload,
  });

  useEffect(() => {
    if (data?.workload_items) {
      let itemsToProcess = data.workload_items;

      // Handle case where API returns stringified JSON
      if (typeof itemsToProcess === 'string') {
        try {
          itemsToProcess = JSON.parse(itemsToProcess);
        } catch (e) {
          console.error("Failed to parse workload_items", e);
          itemsToProcess = [];
        }
      }

      if (Array.isArray(itemsToProcess)) {
        const formattedItems = itemsToProcess.map((item: any) => ({
          ...item,
          // Normalize order identifier for display (prefer assign_order_item_id for item-level id)
          orderId:
            item.assign_order_item_id ||
            item.stitching_order_id ||
            (item.order && item.order.id ? String(item.order.id) : undefined) ||
            item.id ||
            "-",
          // Garment name - prefer nested order item fields, fallback to workflow/item type
          garmentType:
            item.order?.order_items?.[0]?.garment_type ||
            item.workflow_item ||
            item.garmentType ||
            "-",
          // Numeric quantity
          quantity:
            Number(item.quantity) ||
            Number(item.order?.order_items?.[0]?.quantity_of_item) ||
            0,
          // Handle both materialCode and metarialCode (typo support) and API material_code
          metarialCode: Array.isArray(item.metarialCode)
            ? item.metarialCode
            : Array.isArray(item.materialCode)
              ? item.materialCode
              : Array.isArray(item.material_code)
                ? item.material_code
                : item.order?.order_items?.[0]?.material_code
                  ? [item.order.order_items[0].material_code]
                  : [],
          // Status normalization
          // Status normalization
          status: (() => {
            const rawStatus = item.workload_status || item.current_process_status || item.status || "Pending";
            if (rawStatus === "Complete") return "Completed";
            if (rawStatus === "In_Production") return "In Production";
            return rawStatus;
          })(),
          // Deadline - prefer item deadline then order deadline
          deadline: item.deadline || item.order?.deadline,
          // Flatten useful garment details for dialog and column rendering
          garment_details: (() => {
            const oi = item.order?.order_items?.[0] || {};
            const makeUrl = (p: string | undefined) => {
              if (!p) return undefined;
              return p.startsWith("http") ? p : `${BASE_URL}/${p.replace(/^\/+/, "")}`;
            };
            const mapArray = (arr: any[] | undefined) =>
              Array.isArray(arr)
                ? arr.map((v) => (typeof v === "string" ? makeUrl(v) || v : v))
                : [];

            return {
              name: oi.garment_type || item.workflow_item || item.garmentType,
              user_images: mapArray(oi.user_images),
              design_templates: mapArray(oi.design_templates),
              unit_of_measurement: oi.unit_of_measurement,
              measurement_card_key_values: oi.measurement_card_key_values || [],
              additional_items: oi.additional_items || [],
            };
          })(),
        }));
        setItems(formattedItems);
      }
    }
  }, [data, setItems]);

  const activeItems = allItems.filter((item) => item.status !== "Completed");

  const filteredStitchingData = activeItems.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col bg-[#1F2937] p-4 rounded-lg mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#8C03E9] tracking-tight">
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
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading workload...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Error loading data</div>
        ) : (
          <DataTable
            data={filteredStitchingData}
            columns={stitchingColumns}
            enablePagination
          />
        )}
      </div>
    </div>
  );
}
