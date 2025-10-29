import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router";

export default function CuttingManagerAction() {
  const navigate = useNavigate();

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
            <Button
              variant="ghost"
              className="justify-start text-gray-200 hover:bg-[#374151]"
              onClick={() => navigate("/work-load")}
            >
              Manage
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
