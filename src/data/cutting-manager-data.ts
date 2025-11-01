import type { CuttingOrder } from "@/table-types/cutting-manager";

export const cuttingOrders: CuttingOrder[] = [
  {
    id: "1",
    orderId: "ORD-001",
    garment: ["Shirt", "Pants"],
    materials: ["FAB001", "BTN001"],
    qty: 2,
    assignedTo: "Ravi Kumar",
    employeeStatus: "Pending",
    status: "Cutting Pending",
  },
  {
    id: "2",
    orderId: "ORD-002",
    garment: ["Kurta", "Dupatta"],
    materials: ["FAB003", "THR004", "ZIP002"],
    qty: 1,
    assignedTo: "Sita Devi",
    employeeStatus: "Pending",
    status: "In Progress",
  },
];
