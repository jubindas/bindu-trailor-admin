import { SidebarTrigger } from "./ui/sidebar";

import { User, LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-[#8C03E9]/70 backdrop-blur-md px-6 py-3 h-[69px] shadow-md flex items-center justify-between gap-4 z-50">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-white hover:text-zinc-200 transition-colors" />
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90">
          <User className="h-5 w-5 text-white" />
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-[#1F2937]/90 px-3 py-2 text-sm font-medium text-white shadow hover:bg-[#1F2998]/90 transition">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}
