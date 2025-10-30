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

import type { Employee } from "@/table-types/employee-table";

import EmployeeDialog from "@/components/EmployeeDialog"; 

import { toast } from "sonner";

interface Props {
  rowData: Employee;
}

export default function CuttingManagerAction({ rowData }: Props) {
    
  const [openDialog, setOpenDialog] = useState(false);

  const handleDisable = () => {
    console.log("Disabling employee:", rowData.name);
    toast(`Employee ${rowData.name} has been disabled`);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-[#1F2937]/20 rounded-full"
          >
            <MoreVertical className="h-4 w-4 text-[#1F2937]" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-36 bg-[#1F2937] border border-[#374151] p-2 rounded-lg shadow-lg">
          <div className="flex flex-col">
           
            <EmployeeDialog
              mode="edit"
              id={rowData.id}
              initialData={rowData}
              trigger={
                <Button
                  variant="ghost"
                  className="justify-start text-gray-200 hover:bg-[#374151]"
                >
                  Edit
                </Button>
              }
            />

            <Button
              variant="ghost"
              className="justify-start text-red-500 hover:bg-[#374151]"
              onClick={() => setOpenDialog(true)}
            >
              Disable
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to disable this employee?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDisable}
              className="bg-red-500 text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
