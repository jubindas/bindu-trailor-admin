import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";

import {
  ChevronsUpDownIcon,
  CheckIcon,
  Clock,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CuttingManagerPage() {
  const [materialOpen, setMaterialOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [quantityCut, setQuantityCut] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const materialCodes = [
    "COTTON-RED-001",
    "DENIM-BLU-002",
    "LINEN-WHT-003",
    "SILK-BLK-004",
  ];

  const [stitchers, setStitchers] = useState([
    {
      name: "Ravi Kumar",
      available: true,
      weeklyWorkload: {
        Monday: { status: "2 Orders", freeHours: 3 },
        Tuesday: { status: "Free", freeHours: 8 },
        Wednesday: { status: "1 Order", freeHours: 5 },
        Thursday: { status: "Free", freeHours: 8 },
        Friday: { status: "1 Order", freeHours: 4 },
        Saturday: { status: "Free", freeHours: 7 },
        Sunday: { status: "Off", freeHours: 0 },
      },
    },
    {
      name: "Anita Devi",
      available: true,
      weeklyWorkload: {
        Monday: { status: "Busy", freeHours: 2 },
        Tuesday: { status: "1 Order", freeHours: 6 },
        Wednesday: { status: "2 Orders", freeHours: 4 },
        Thursday: { status: "Free", freeHours: 8 },
        Friday: { status: "Busy", freeHours: 3 },
        Saturday: { status: "Free", freeHours: 7 },
        Sunday: { status: "Off", freeHours: 0 },
      },
    },
    {
      name: "Rajesh Yadav",
      available: true,
      weeklyWorkload: {
        Monday: { status: "Free", freeHours: 8 },
        Tuesday: { status: "Free", freeHours: 8 },
        Wednesday: { status: "Free", freeHours: 8 },
        Thursday: { status: "1 Order", freeHours: 6 },
        Friday: { status: "Free", freeHours: 8 },
        Saturday: { status: "2 Orders", freeHours: 3 },
        Sunday: { status: "Off", freeHours: 0 },
      },
    },
    {
      name: "Kiran Patel",
      available: true,
      weeklyWorkload: {
        Monday: { status: "Free", freeHours: 8 },
        Tuesday: { status: "Free", freeHours: 7 },
        Wednesday: { status: "1 Order", freeHours: 5 },
        Thursday: { status: "Free", freeHours: 8 },
        Friday: { status: "1 Order", freeHours: 4 },
        Saturday: { status: "Free", freeHours: 8 },
        Sunday: { status: "Off", freeHours: 0 },
      },
    },
  ]);

  const toggleAvailability = (name: string) => {
    setStitchers((prev) =>
      prev.map((s) => (s.name === name ? { ...s, available: !s.available } : s))
    );
  };

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const grouped = [];
  for (let i = 0; i < stitchers.length; i += 2) {
    grouped.push(stitchers.slice(i, i + 2));
  }

  const handleSave = () => {
    if (!selectedMaterial || !quantityCut) {
      alert("Please fill all required fields before saving.");
      return;
    }
    const assignedDays = Object.keys(selectedDays).filter(
      (d) => selectedDays[d]
    );
    alert(
      `Cutting order saved!\nMaterial: ${selectedMaterial}\nDays: ${assignedDays.join(
        ", "
      )}`
    );
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">
          Cutting Manager Panel
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Assign cutting work and manage stitchers efficiently.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-[#1F2937] rounded-2xl shadow-lg p-6 space-y-6">

        <div>
          <Label className="font-semibold text-gray-200">Material Code *</Label>
          <Popover open={materialOpen} onOpenChange={setMaterialOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between bg-purple-200 border border-purple-300 text-purple-700 mt-1 hover:bg-purple-50"
              >
                {selectedMaterial || "Select Material"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 text-purple-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0 bg-white border border-purple-300">
              <Command>
                <CommandInput placeholder="Search material..." />
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
                        className="text-gray-700 hover:bg-purple-100"
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4 text-purple-600",
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

        <div>
          <Label className="font-semibold text-gray-200">Quantity Cut *</Label>
          <Input
            type="number"
            placeholder="Enter quantity"
            value={quantityCut}
            onChange={(e) => setQuantityCut(e.target.value)}
            className="w-full bg-purple-200 border border-purple-300 text-purple-700 mt-1 hover:bg-purple-50"
          />
        </div>

        <div>
          <Label className="font-semibold text-gray-200 mb-2 block">
            Available Stitchers
          </Label>

          <div className="space-y-4">
            {grouped.map((pair, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 "
              >
                {pair.map((s) => (
                  <Dialog
                    key={s.name}
                    open={openDialog === s.name}
                    onOpenChange={(open) => setOpenDialog(open ? s.name : null)}
                  >
                    <DialogTrigger asChild>
                      <div className="border rounded-lg transition-all duration-200 bg-purple-300 hover:bg-purple-200 shadow-sm cursor-pointer p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-purple-800">
                            {s.name}
                          </h3>
                          <p
                            className={`text-xs mt-1 ${
                              s.available ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {s.available ? "Available" : "Busy"}
                          </p>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAvailability(s.name);
                          }}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          {s.available ? (
                            <ToggleRight className="w-5 h-5 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[600px] bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-purple-700">
                          {s.name} - Weekly Schedule
                        </DialogTitle>
                        <DialogDescription>
                          Click a day to assign this stitcher to that day’s
                          cutting task.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                        {Object.entries(s.weeklyWorkload).map(([day, data]) => (
                          <div
                            key={day}
                            onClick={() => handleDayToggle(day)}
                            className={`p-3 rounded-lg border text-center cursor-pointer transition ${
                              selectedDays[day]
                                ? "bg-purple-200 border-purple-500"
                                : "bg-purple-50 border-purple-200 hover:bg-purple-100"
                            }`}
                          >
                            <p className="font-semibold text-sm text-purple-700">
                              {day}
                            </p>
                            <p className="text-xs text-gray-700">
                              {data.status}
                            </p>
                            <div className="flex justify-center items-center gap-1 mt-1 text-gray-600 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>{data.freeHours} hrs free</span>
                            </div>
                            {selectedDays[day] && (
                              <p className="text-xs text-green-700 font-medium mt-1">
                                Assigned
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      <DialogFooter className="mt-4">
                        <Button
                          onClick={() => setOpenDialog(null)}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Done
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="font-semibold text-gray-200">Remarks</Label>
          <Input
            placeholder="Any notes or special instructions"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full bg-purple-200 border border-purple-300 text-purple-700 mt-1 hover:bg-purple-50"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-purple-100">
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow"
          >
            Save Cutting Order
          </Button>
        </div>
      </div>
    </div>
  );
}
