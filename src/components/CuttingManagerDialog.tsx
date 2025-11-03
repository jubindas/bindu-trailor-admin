/* eslint-disable @typescript-eslint/no-explicit-any */
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronsUpDown, Check, Clock } from "lucide-react";

import { cn } from "@/lib/utils";

import { format } from "date-fns/format";

const garmentsList = [
  {
    id: 1,
    garmentType: "Formal Shirt",
    fabricSource: "Cotton",
    materialCode: "COTTON-RED-001",
    quantity: 150,
    deadline: "03/12/2025",
    measurementUnit: "INC",
    measurments: {
      length: "32 inches",
      chest: "40 inches",
      waist: "34 inches",
      shoulder: "18 inches",
      sleeve: "25 inches",
      collar: "Regular",
      sOpen: "Buttoned",
    },
    img: "https://example.com/images/formal-shirt.png",
  },
  {
    id: 2,
    garmentType: "Kurti",
    fabricSource: "Silk",
    materialCode: "SILK-BLK-004",
    quantity: 100,
    deadline: "01/09/2025",
    measurementUnit: "INC",
    measurments: {
      length: "38 inches",
      chest: "42 inches",
      waist: "36 inches",
      shoulder: "20 inches",
      sleeve: "26 inches",
      collar: "Regular",
      sOpen: "Buttoned",
    },
    img: "https://example.com/images/kurti.png",
  },
];

export default function CuttingManagerPage() {
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const [quantityCut, setQuantityCut] = useState("");

  const [remarks, setRemarks] = useState("");

  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});

  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const [garmentData, setGarmentData] = useState<string | number>();

  const [selectedStitcher, setSelectedStitcher] = useState<string | null>(null);

  const [availableGarments, setAvailableGarments] = useState(garmentsList);

  const [date, setDate] = useState<Date>();

  const [quantityCutting, setQuantityCutting] = useState("");

  const [measurementUnit, setMeasurementUnit] = useState("");

  console.log("Selected Date:", date);

  const [stitchers] = useState([
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

  const [editableGarments, setEditableGarments] = useState(garmentsList || []);

  const handleMeasurementChange = (garmentId: any, key: any, newValue: any) => {
    setEditableGarments((prev) =>
      prev.map((g) =>
        g.id === garmentId
          ? {
              ...g,
              measurments: {
                ...g.measurments,
                [key]: newValue,
              },
            }
          : g
      )
    );
  };

  const handleSave = () => {
    if (
      !selectedMaterial ||
      !quantityCut ||
      !garmentData ||
      !selectedStitcher
    ) {
      alert("Please fill all required fields before saving.");
      return;
    }

    const assignedDays = Object.keys(selectedDays).filter(
      (d) => selectedDays[d]
    );

    const cuttingOrderData = {
      garment: garmentData,
      material: selectedMaterial,
      quantity: quantityCut,
      stitcher: selectedStitcher,
      assignedDays,
      measurementUnit,
      assignedDate: date ? format(date, "PPP") : "Not specified",
      remarks,
      editableGarments,
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

    setAvailableGarments((prev) =>
      prev.filter((g) => g.garmentType !== garmentData)
    );

    setSelectedMaterial("");
    setQuantityCut("");
    setRemarks("");
    setSelectedDays({});
    setGarmentData(undefined);
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between mt-1 bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-50 text-xs"
              >
                {garmentData || "Select Material"}
                <ChevronsUpDown className="ml-2 h-4 w-4 text-purple-500" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-120 bg-white border border-purple-200 rounded-md shadow-md">
              {availableGarments.map((mat) => (
                <DropdownMenuItem
                  key={mat.id}
                  onClick={() => setGarmentData(mat.garmentType)}
                  className={cn(
                    "flex justify-between text-gray-700 text-xs hover:bg-purple-50 cursor-pointer",
                    selectedMaterial === mat.materialCode
                      ? "bg-purple-100 text-purple-700"
                      : ""
                  )}
                >
                  {mat.garmentType}
                  {selectedMaterial === mat.garmentType && (
                    <Check className="h-3.5 w-3.5 text-purple-600" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {garmentData && (
            <p className="text-xs text-green-500 mt-1">
              Selected Garment: {garmentData}
            </p>
          )}
        </div>

        <div className="flex flex-row items-end gap-6">
          {garmentData && (
            <>
              {editableGarments
                .filter((g) => g.garmentType === garmentData)
                .map((g) => (
                  <div key={g.id} className="flex flex-row items-end gap-6">
                    <div className="flex flex-col gap-1">
                      <Label className="font-medium text-gray-200 text-sm">
                        Deadline
                      </Label>
                      <Input
                        type="text"
                        value={g.deadline || "No deadline set"}
                        readOnly
                        className="bg-purple-100 border border-purple-300 text-purple-700 w-41 text-xs font-normal cursor-not-allowed"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="font-medium text-gray-200 text-sm">
                        Material Code *
                      </Label>
                      <Input
                        type="text"
                        value={g.materialCode || "N/A"}
                        readOnly
                        className="bg-purple-100 border border-purple-300 text-purple-700 w-41 text-xs font-normal cursor-not-allowed"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-medium text-gray-200 text-sm">
                        Quantity Cut *
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        value={quantityCutting}
                        onChange={(e) => setQuantityCutting(e.target.value)}
                        className="w-41 bg-purple-100 border border-purple-300 text-purple-700 hover:bg-purple-50 text-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="font-medium text-gray-200 text-sm">
                        Measurement Unit
                      </Label>
                      <select
                        value={g.measurementUnit}
                        onChange={(e) => setMeasurementUnit(e.target.value)}
                        className="w-41 h-9 bg-purple-100 border border-purple-300 text-purple-700 text-xs rounded-md px-2 py-1 focus:outline-none hover:bg-purple-50"
                      >
                        <option value="pcs">INC</option>
                        <option value="meters">MM</option>
                        <option value="kg">CM</option>
                        <option value="dozen">YD</option>
                      </select>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        {garmentData && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-3 shadow-sm">
            {editableGarments
              .filter((g) => g.garmentType === garmentData)
              .map((g) => (
                <div
                  key={g.id}
                  className="flex flex-col sm:flex-row gap-4 items-start"
                >
                  <div className="w-full mt-10 sm:w-1/3 flex flex-col items-center">
                    <img
                      src={g.img}
                      alt={g.garmentType}
                      className="w-40 h-40 object-cover rounded-md border border-purple-200 shadow-sm"
                    />
                    <p className="mt-2 text-sm font-medium text-purple-700 text-center">
                      {g.garmentType}
                    </p>

                    <p className="text-xs text-gray-500">Qty: {g.quantity}</p>
                  </div>

                  <div className="flex-1 w-full">
                    <h3 className="text-purple-700 font-semibold text-sm mb-3">
                      Measurements
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-700">
                      {Object.entries(g.measurments).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex flex-col bg-white border border-purple-100 rounded-md p-2 hover:shadow-sm transition-all"
                        >
                          <Label className="capitalize text-[11px] text-purple-600 mb-1">
                            {key}
                          </Label>
                          <Input
                            type="text"
                            readOnly
                            value={value}
                            onChange={(e) =>
                              handleMeasurementChange(g.id, key, e.target.value)
                            }
                            className="text-xs border-purple-200 bg-purple-50 focus:ring-2 focus:ring-purple-300 text-gray-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

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
                    className={`rounded-lg border transition-all cursor-pointer p-3 flex flex-col items-center justify-center text-center text-xs ${
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
                        className={`p-2 rounded-lg border text-center cursor-pointer transition text-xs ${
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

        <div>
          <Label className="font-medium text-gray-200 text-sm">Remarks</Label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full h-15 bg-purple-100 border border-purple-300 rounded mt-1 hover:bg-purple-50 "
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
