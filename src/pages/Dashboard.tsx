import { useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Bell, ClipboardCheck, Scissors, Clock } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen p-8 relative">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-purple-700">
          Operator Dashboard
        </h1>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="relative p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition">
              <Bell className="text-purple-700 w-6 h-6" />

              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[350px] sm:w-[400px] bg-[#1F2937] text-white"
          >
            <SheetHeader className="border-b border-gray-700 pb-3">
              <SheetTitle className="text-purple-400 text-lg">
                Notifications
              </SheetTitle>
            </SheetHeader>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/70 hover:bg-gray-800 transition">
                <div>
                  <p className="text-sm font-medium text-gray-100">
                    Order #2459 delayed due to fabric issue
                  </p>
                  <p className="text-xs text-gray-400">
                    Delay reported 2 hours ago
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  Delayed
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/70 hover:bg-gray-800 transition">
                <div>
                  <p className="text-sm font-medium text-gray-100">
                    Order #2460 pending stitching completion
                  </p>
                  <p className="text-xs text-gray-400">Pending for 1 hour</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/70 hover:bg-gray-800 transition">
                <div>
                  <p className="text-sm font-medium text-gray-100">
                    Order #2457 ready for quality check
                  </p>
                  <p className="text-xs text-gray-400">Updated 30 mins ago</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  Ready
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-[#1F2937] text-white shadow-lg hover:shadow-purple-500 transition transform hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-purple-400">
              Today’s Assigned Tasks
            </CardTitle>
            <ClipboardCheck className="text-purple-400 w-5 h-5" />
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-gray-300">
            <p>• Order #2456 - Stitching</p>
            <p>• Order #2457 - Cutting</p>
            <p>• Order #2458 - Finishing</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1F2937] text-white shadow-lg hover:shadow-purple-500 transition transform hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-purple-400">
              Cutting Plan for Today
            </CardTitle>
            <Scissors className="text-purple-400 w-5 h-5" />
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-gray-300">
            <p>• Fabric A – 50 units</p>
            <p>• Fabric B – 40 units</p>
            <p>• Fabric C – 25 units</p>
          </CardContent>
        </Card>

        <Card className="bg-[#1F2937] text-white shadow-lg hover:shadow-purple-500 transition transform hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-purple-400">
              Completion Status
            </CardTitle>
            <Clock className="text-purple-400 w-5 h-5" />
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-gray-300">
            <p>Cutting – 80% Complete</p>
            <p>Stitching – 60% Complete</p>
            <p>Finishing – 30% Complete</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
