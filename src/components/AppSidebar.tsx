/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

import {
  Home,
  ChevronRight,
  ChevronDown,
  UserPen,
  PackageOpen,
  User,
  Spool,
} from "lucide-react";

import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url?: string;
  icon?: any;
  count?: number;
  children?: MenuItem[];
}

export function AppSidebar() {

  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const location = useLocation();

  const role = "cuttingManager"; // employee or cuttingManager


  const cuttingManagerItems: MenuItem[] = [
    
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Work Assignment", url: "/work-assignment", icon: UserPen },
    { title: "Employee", url: "/employee", icon: User },
    { title: "Order Status", url: "/order-status", icon: PackageOpen },
  ];

  const employeeItems: MenuItem[] = [
    { title: "Stitching Status", url: "/stitching", icon: Spool },
  ];

  const items = role === "cuttingManager" ? cuttingManagerItems : employeeItems;

  useEffect(() => {
    const activeParents = items
      .filter(
        (item) =>
          item.children &&
          item.children.some((child) => location.pathname === child.url)
      )
      .map((item) => item.title);

    if (activeParents.length > 0) {
      setOpenMenus((prev) => Array.from(new Set([...prev, ...activeParents])));
    }
  }, [location.pathname, items]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isParentActive = (item: MenuItem) => {
    if (!item.children) return false;
    return item.children.some((child) => location.pathname === child.url);
  };

  return (
    <Sidebar className="bg-[#18181B] text-gray-300 w-64 min-h-screen border-r border-zinc-800">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-5 text-xs uppercase tracking-widest font-semibold text-zinc-400">
            {role === "cuttingManager"
              ? "Cutting Manager Panel"
              : "Employee Panel"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="mt-5 ml-5 size-50">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm transition rounded-md ${
                          isParentActive(item) || openMenus.includes(item.title)
                            ? "bg-zinc-800 text-white"
                            : "hover:bg-zinc-700 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                        </div>
                        {openMenus.includes(item.title) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>

                      {openMenus.includes(item.title) && item.children && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-zinc-700 pl-2">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.title}
                              to={child.url ?? "#"}
                              className={({ isActive }) =>
                                `block px-3 py-1.5 text-sm rounded-md transition ${
                                  isActive
                                    ? "bg-[#8C03E9] text-white"
                                    : "text-gray-400 hover:text-white hover:bg-zinc-700"
                                }`
                              }
                            >
                              {child.title}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.url ?? "#"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 text-sm rounded-md transition ${
                          isActive
                            ? "bg-[#8C03E9] text-white"
                            : "text-gray-400 hover:bg-zinc-700 hover:text-white"
                        }`
                      }
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </NavLink>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
