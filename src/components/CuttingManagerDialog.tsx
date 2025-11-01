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

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

import {
  ChevronsUpDownIcon,
  CheckIcon,
  Clock,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { format } from "date-fns/format";

const materialCodes = [
  "COTTON-RED-001",
  "DENIM-BLU-002",
  "LINEN-WHT-003",
  "SILK-BLK-004",
];



export default function CuttingManagerPage() {
  const [materialOpen, setMaterialOpen] = useState(false);

  const [selectedMaterial, setSelectedMaterial] = useState("");

  const [quantityCut, setQuantityCut] = useState("");

  const [remarks, setRemarks] = useState("");

  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});

  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const [garmentData, setGarmentData] = useState<string | null>(null);

  const [selectedStitcher, setSelectedStitcher] = useState<string | null>(null);

  const [date, setDate] = useState<Date>();

  console.log("Selected Date:", date);

  const [garments, setGarments] = useState([
  { id: 1, name: "Formal Shirt", type: "Men" },
  { id: 2, name: "Kurti", type: "Women" },
]);


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
  if (!selectedMaterial || !quantityCut || !garmentData || !selectedStitcher) {
    alert("Please fill all required fields before saving.");
    return;
  }

  const assignedDays = Object.keys(selectedDays).filter((d) => selectedDays[d]);

  const cuttingOrderData = {
    garment: garmentData,
    material: selectedMaterial,
    quantity: quantityCut,
    stitcher: selectedStitcher,
    assignedDays,
    assignedDate: date ? format(date, "PPP") : "Not specified",
    remarks,
    createdAt: new Date().toLocaleString(),
  };

  console.clear();
  console.group("Cutting Order Summary");
  console.table(cuttingOrderData);
  console.groupEnd();

  alert(
    `Cutting order saved!\n` +
      `Material: ${selectedMaterial}\n` +
      `Garment: ${garmentData}\n` +
      `Quantity: ${quantityCut}\n` +
      `Stitcher: ${selectedStitcher}\n` +
      `Days: ${assignedDays.join(", ")}\n` +
      `Deadline: ${date ? format(date, "PPP") : "Not specified"}\n` +
      `Remarks: ${remarks || "None"}`
  );

  // 🔥 Remove the selected garment from the list
  setGarments((prev) => prev.filter((g) => g.name !== garmentData));

  // 🔁 Reset the form fields
  setSelectedMaterial("");
  setQuantityCut("");
  setRemarks("");
  setSelectedDays({});
  setGarmentData(null);
  setSelectedStitcher(null);
  setDate(undefined);
  setOpenDialog(null);
};


  return (
    <div className="min-h-screen px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700 tracking-tight">
          Cutting Manager Panel
        </h1>
        <p className="text-gray-500 text-xs mt-1">
          Assign cutting work and manage stitchers efficiently
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-[#1F2937] border border-white rounded-xl shadow-md p-5 space-y-5">
        <div>
          <Label className="font-medium text-gray-200 mb-2 block text-sm">
            Garments List
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {garments.map((g) => (
              <div
                key={g.id}
                onClick={() => setGarmentData(g.name)}
                className={`p-2.5 rounded-lg text-center transition-all cursor-pointer border text-sm
              ${
                garmentData === g.name
                  ? "bg-purple-500 text-white border-purple-600"
                  : "bg-purple-200 hover:bg-purple-100 text-purple-800 border-transparent"
              }`}
              >
                <h3 className="font-semibold">{g.name}</h3>
                <p className="text-xs opacity-80">{g.type}</p>
              </div>
            ))}
          </div>
          {garmentData && (
            <p className="text-xs text-green-400 mt-2">
              ✅ Selected Garment: {garmentData}
            </p>
          )}
        </div>

        <div>
          <Label className="font-medium text-gray-200 text-sm">
            Material Code *
          </Label>
          <Popover open={materialOpen} onOpenChange={setMaterialOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between mt-1 bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-50 text-xs"
              >
                {selectedMaterial || "Select Material"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 text-purple-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-154 p-0 bg-white border border-purple-200 rounded-md shadow-md">
              <Command>
                <CommandInput
                  placeholder="Search material..."
                  className="text-xs"
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
                        className="text-gray-700 text-xs hover:bg-purple-50"
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-3.5 w-3.5 text-purple-600",
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
          <Label className="font-medium text-gray-200 text-sm">
            Quantity Cut *
          </Label>
          <Input
            type="number"
            placeholder="Enter quantity"
            value={quantityCut}
            onChange={(e) => setQuantityCut(e.target.value)}
            className="w-full bg-purple-100 border border-purple-300 text-purple-700 mt-1 hover:bg-purple-50 text-xs"
          />
        </div>

        <div>
          <Label className="font-medium text-gray-200 mb-2 block text-sm">
            Available Stitchers
          </Label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {stitchers.map((s) => (
              <Dialog
                key={s.name}
                open={openDialog === s.name}
                onOpenChange={(open) => setOpenDialog(open ? s.name : null)}
              >
                <DialogTrigger asChild>
                  <div
                    onClick={() => setSelectedStitcher(s.name)}
                    className={`rounded-lg border transition-all cursor-pointer p-3 flex flex-col items-center justify-center text-center text-xs
                ${
                  s.available
                    ? "bg-purple-100 hover:bg-purple-50 border-purple-200"
                    : "bg-gray-100 hover:bg-gray-50 border-gray-200"
                }`}
                  >
                    <h3
                      className={`font-semibold ${
                        s.available ? "text-purple-800" : "text-gray-700"
                      }`}
                    >
                      {s.name}
                    </h3>
                    <p
                      className={`mt-0.5 ${
                        s.available ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {s.available ? "Available" : "Busy"}
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAvailability(s.name);
                      }}
                      className="mt-1 text-purple-600 hover:text-purple-800"
                    >
                      {s.available ? (
                        <ToggleRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[480px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-purple-700 text-base">
                      {s.name} - Weekly Schedule
                    </DialogTitle>
                    <DialogDescription className="text-xs text-gray-500">
                      Click a day to assign this stitcher.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                    {Object.entries(s.weeklyWorkload).map(([day, data]) => (
                      <div
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`p-2 rounded-lg border text-center cursor-pointer transition text-xs
                    ${
                      selectedDays[day]
                        ? "bg-purple-100 border-purple-400"
                        : "bg-white border-gray-200 hover:bg-purple-50"
                    }`}
                      >
                        <p className="font-semibold text-purple-700">{day}</p>
                        <p className="text-gray-600">{data.status}</p>
                        <div className="flex justify-center items-center gap-1 mt-1 text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{data.freeHours} hrs</span>
                        </div>
                        {selectedDays[day] && (
                          <p className="text-green-600 font-medium mt-1">
                            Assigned
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <DialogFooter className="mt-3">
                    <Button
                      onClick={() => setOpenDialog(null)}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
                    >
                      Done
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="font-medium text-gray-200 text-sm">Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="bg-purple-100 border border-purple-300 text-purple-700 w-[220px] justify-start text-left font-normal text-xs"
              >
                <CalendarIcon className="mr-2" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1F2937] text-white">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="font-medium text-gray-200 text-sm">Remarks</Label>
          <Input
            placeholder="Any notes or special instructions"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full bg-purple-100 border border-purple-300 text-purple-700 mt-1 hover:bg-purple-50 text-xs"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-700 mt-2">
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md text-xs shadow"
          >
            Save Cutting Order
          </Button>
        </div>
      </div>
    </div>
  );
}
