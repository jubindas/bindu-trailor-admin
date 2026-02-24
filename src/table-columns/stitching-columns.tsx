import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Stitching } from "@/table-types/stitching-order";

import type { ColumnDef } from "@tanstack/react-table";

import { StitchingContext } from "@/context/StitchingContext";
import { updateWorkloadStatus } from "@/services/apiStitching";

import { useNavigate } from "react-router-dom";

function StatusCell({ row }: { row: { original: Stitching } }) {
  const { updateItemStatus, allItems } = useContext(StitchingContext);
  const navigate = useNavigate();

  // Get current status from context to keep it in sync
  const currentItem = allItems.find((item) => item.orderId === row.original.orderId);
  const status = currentItem?.status || row.original.status;

  const handleStatusChange = async (newStatus: string) => {
    const apiStatusMap: Record<string, string> = {
      "Pending": "Pending",
      "In Production": "In_Production",
      "Completed": "Complete"
    };
    const apiStatus = apiStatusMap[newStatus];

    if (apiStatus && row.original.id) {
      try {
        await updateWorkloadStatus(row.original.id, apiStatus);
      } catch (error) {
        console.error("Failed to update status", error);
      }
    }

    updateItemStatus(row.original.orderId, newStatus);

    // Navigate to completed page when status is set to Completed
    if (newStatus === "Completed") {
      navigate("/stitching-complete");
    }
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[150px] bg-[#1F2937] border border-[#374151] text-gray-200">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>

      <SelectContent className="bg-[#1F2937] text-gray-200 border-[#374151]">
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="In Production">In Production</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
}

import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const stitchingColumns: ColumnDef<Stitching>[] = [
  {
    id: "slNo",
    header: "S. No",
    cell: ({ row }) => {
      try {
        const table = (row as any).table;
        const state = table.getState();
        const pageIndex = state.pagination?.pageIndex || 0;
        const pageSize = state.pagination?.pageSize || table.getRowModel().rows.length || 0;
        return pageIndex * pageSize + row.index + 1;
      } catch (e) {
        return row.index + 1;
      }
    },
  },
  {
    id: "garmentName",
    header: "Garment Name",
    cell: ({ row }) => {
      const item = row.original;
      return (
        item.garment_details?.name ||
        item.garment_details?.garment_name ||
        item.garmentType ||
        "-"
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const date = row.original.deadline;
      return date ? new Date(date).toLocaleDateString() : "-";
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-600 hover:text-purple-700 hover:bg-purple-100">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1F2937] text-white border-gray-700 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-purple-400">Order Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Basic Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-purple-300 border-b border-gray-700 pb-1">Basic Info</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {/* <span className="text-gray-400">Order ID:</span>
                  <span>{item.orderId}</span> */}
                  <span className="text-gray-400">Garment Type:</span>
                  <span>{item.garmentType}</span>
                  <span className="text-gray-400">Quantity:</span>
                  <span>{item.quantity}</span>
                  <span className="text-gray-400">Deadline:</span>
                  <span>{item.deadline ? new Date(item.deadline).toLocaleDateString() : "-"}</span>
                  <span className="text-gray-400">Status:</span>
                  <span className="capitalize">{item.status}</span>
                </div>
              </div>

              {/* Measurement / Fabric */}
              <div className="space-y-3">
                <h3 className="font-semibold text-purple-300 border-b border-gray-700 pb-1">Specifications</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-gray-400">Material Code:</span>
                  <span>{item.metarialCode.join(", ") || "-"}</span>
                  <span className="text-gray-400">Unit:</span>
                  <span>{item.garment_details?.unit_of_measurement || "-"}</span>
                </div>
              </div>

              {/* Additional Materials */}
              {item.garment_details?.additional_items && item.garment_details.additional_items.length > 0 && (
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <h3 className="font-semibold text-purple-300 border-b border-gray-700 pb-1 w-full">Additional Materials</h3>
                  <div className="text-sm">
                    {item.garment_details.additional_items.map((mat: any, i: number) => (
                      <div key={i} className="bg-gray-800 p-3 rounded border border-gray-700 w-full" >
                        <div className="flex justify-between border-b border-gray-700 pb-1 mb-1">
                          <span className="text-purple-300 font-medium">Material Code: <b className="text-white">  {mat.material_code} </b></span>
                        </div>
                        <div className="flex justify-around text-xs">
                          <div><span className="text-gray-500">Unit:</span> {mat.unit}</div>
                          <div><span className="text-gray-500">Stock:</span> {mat.stock_quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Design Images */}
              {item.garment_details?.design_templates && item.garment_details.design_templates.length > 0 && (
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <h3 className="font-semibold text-purple-300 border-b border-gray-700 pb-1">Design Templates</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.garment_details.design_templates.map((img: string, i: number) => (
                      <img key={i} src={img} alt="Design" className="w-24 h-24 object-cover rounded-md border border-gray-600" />
                    ))}
                  </div>
                </div>
              )}

              {/* User Images */}
              {item.garment_details?.user_images && item.garment_details.user_images.length > 0 && (
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <h3 className="font-semibold text-purple-300 border-b border-gray-700 pb-1">User Images</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.garment_details.user_images.map((img: string, i: number) => (
                      <img key={i} src={img} alt="User" className="w-24 h-24 object-cover rounded-md border border-gray-600" />
                    ))}
                  </div>
                </div>
              )}

              {/* Measurements Keys */}
              {item.garment_details?.measurement_card_key_values && item.garment_details.measurement_card_key_values.length > 0 && (
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <h3 className="font-semibold text-purple-300 border-b border-gray-700 pb-1">Measurements</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {item.garment_details.measurement_card_key_values.map((m: any, i: number) => (
                      m.value ? (
                        <div key={i} className="bg-gray-800 p-2 rounded border border-gray-700 flex justify-between">
                          <span className="text-gray-400">{m.key}:</span>
                          <span className="font-medium">{m.value}</span>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              )}

              {/* Remarks */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <h3 className="font-semibold text-purple-300 border-b border-gray-700 pb-1">Remarks</h3>
                <p className="text-sm bg-gray-800 p-3 rounded-md border border-gray-700 min-h-[60px]">
                  {item.remarks || "No remarks provided."}
                </p>
              </div>

            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
