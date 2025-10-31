import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Stitching } from "@/table-types/stitching-order";

interface Props {
  rowData: Stitching;
}

export default function StitchingAction({ rowData }: Props) {
  console.log("Row Data:", rowData);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleUpdate = () => {
    console.log("Status updated to:", selectedStatus);
    setOpenDialog(false);
  };

  return (
    <>
      {/* Popover with 3-dot button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-[#1F2937]/20 rounded-full"
          >
            <MoreVertical className="h-4 w-4 text-[#1F2937]" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-40 bg-[#1F2937] border border-[#374151] p-2 rounded-lg shadow-lg">
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="justify-start text-gray-200 hover:bg-[#374151]"
              onClick={() => setOpenDialog(true)}
            >
              Update Status
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Alert Dialog for updating status */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="bg-[#1F2937] border border-[#374151] text-gray-200">
          <AlertDialogHeader>
            <AlertDialogTitle>Update Work Status</AlertDialogTitle>
          </AlertDialogHeader>

          <div className="mt-4">
            <label className="block text-sm mb-2">Select new status:</label>
            <Select onValueChange={(value) => setSelectedStatus(value)}>
              <SelectTrigger className="w-full bg-[#111827] border-[#374151] text-gray-200">
                <SelectValue placeholder="Choose status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1F2937] text-gray-200 border-[#374151]">
                <SelectItem value="Cutting Pending">Cutting Pending</SelectItem>
                <SelectItem value="In Production">In Production</SelectItem>
                <SelectItem value="Quality Check">Quality Check</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-[#374151] text-gray-200 hover:bg-[#4B5563]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpdate}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
