import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

interface CuttingManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CuttingManagerDialog({
  open,
  onOpenChange,
}: CuttingManagerDialogProps) {
  const [materialOpen, setMaterialOpen] = useState(false);
  const [stitcherOpen, setStitcherOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedStitcher, setSelectedStitcher] = useState("");
  const [quantityCut, setQuantityCut] = useState("");
  const [remarks, setRemarks] = useState("");
  const [availabilityOpen, setAvailabilityOpen] = useState(false);

  const materialCodes = [
    "COTTON-RED-001",
    "DENIM-BLU-002",
    "LINEN-WHT-003",
    "SILK-BLK-004",
  ];

  const stitchers = [
    { name: "Ravi Kumar", available: true, nextAvailable: "Today" },
    { name: "Anita Devi", available: false, nextAvailable: "29 Oct 2025" },
    { name: "Rajesh Yadav", available: true, nextAvailable: "Today" },
    { name: "Pooja Singh", available: false, nextAvailable: "30 Oct 2025" },
    { name: "Vikram Chauhan", available: true, nextAvailable: "Tomorrow" },
  ];

  const handleSave = () => {
    console.log({
      materialCode: selectedMaterial,
      quantityCut,
      stitcher: selectedStitcher,
      remarks,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-[#1F2937] text-gray-100 border border-[#374151] shadow-2xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-semibold">
            Manage Cutting Order
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Review materials, check availability, and assign a stitcher.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Material Selection */}
          <div className="grid gap-2">
            <Label className="text-gray-300">Material Code *</Label>
            <Popover open={materialOpen} onOpenChange={setMaterialOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={materialOpen}
                  className="w-full justify-between bg-[#111827] border border-[#374151] text-gray-100 hover:bg-[#1F2937]"
                >
                  {selectedMaterial || "Select Material..."}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-120 p-0 bg-[#1F2937] border border-[#374151]">
                <Command>
                  <CommandInput
                    placeholder="Search material..."
                    className="text-gray-100 placeholder:text-gray-400"
                  />
                  <CommandList>
                    <CommandEmpty>No materials found.</CommandEmpty>
                    <CommandGroup>
                      {materialCodes.map((mat) => (
                        <CommandItem
                          key={mat}
                          value={mat}
                          onSelect={() => {
                            setSelectedMaterial(mat);
                            setMaterialOpen(false);
                          }}
                          className="text-gray-100 hover:bg-[#374151]"
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedMaterial === mat
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {mat}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Quantity */}
          <div className="grid gap-2">
            <Label className="text-gray-300">Quantity Cut *</Label>
            <Input
              type="number"
              placeholder="Enter cut quantity"
              value={quantityCut}
              onChange={(e) => setQuantityCut(e.target.value)}
              className="bg-[#111827] border border-[#374151] text-gray-100 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          {/* Availability Check */}
          <div className="grid gap-2">
            <Label className="text-gray-300">Check Stitcher Availability</Label>
            <Button
              onClick={() => setAvailabilityOpen(!availabilityOpen)}
              className="bg-purple-600 hover:bg-purple-700 text-white w-fit"
            >
              {availabilityOpen ? "Hide Availability" : "Check Availability"}
            </Button>

            {availabilityOpen && (
              <div className="mt-3 p-3 bg-[#111827] border border-[#374151] rounded-lg text-sm">
                <h4 className="font-medium text-gray-200 mb-2">
                  Stitcher Availability:
                </h4>
                <ul className="space-y-1">
                  {stitchers.map((s) => (
                    <li
                      key={s.name}
                      className={`flex justify-between items-center py-1 px-2 rounded ${
                        s.available
                          ? "bg-green-900/40 text-green-300"
                          : "bg-red-900/40 text-red-300"
                      }`}
                    >
                      <span>{s.name}</span>
                      <span className="text-xs italic">
                        {s.available
                          ? "Available"
                          : `Busy till ${s.nextAvailable}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Stitcher Selection (after checking availability) */}
          <div className="grid gap-2">
            <Label className="text-gray-300">Assign Stitcher *</Label>
            <Popover open={stitcherOpen} onOpenChange={setStitcherOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={stitcherOpen}
                  className="w-full justify-between bg-[#111827] border border-[#374151] text-gray-100 hover:bg-[#1F2937]"
                >
                  {selectedStitcher || "Select Stitcher..."}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-120 p-0 bg-[#1F2937] border border-[#374151]">
                <Command>
                  <CommandInput
                    placeholder="Search stitcher..."
                    className="text-gray-100 placeholder:text-gray-400"
                  />
                  <CommandList>
                    <CommandEmpty>No stitchers found.</CommandEmpty>
                    <CommandGroup>
                      {stitchers
                        .filter((s) => s.available) // only show available ones
                        .map((s) => (
                          <CommandItem
                            key={s.name}
                            value={s.name}
                            onSelect={() => {
                              setSelectedStitcher(s.name);
                              setStitcherOpen(false);
                            }}
                            className="text-gray-100 hover:bg-[#374151]"
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedStitcher === s.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {s.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Remarks */}
          <div className="grid gap-2">
            <Label className="text-gray-300">Remarks</Label>
            <Input
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="bg-[#111827] border border-[#374151] text-gray-100 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <DialogFooter className="mt-5 flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-300 hover:bg-[#374151]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
