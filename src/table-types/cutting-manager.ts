export interface CuttingOrder {
  id: string;
  orderId: string;
  garment: string[];
  materials: string[];
  qty: number;
  assignedTo: string;
  employeeStatus?: string;
  status: "Cutting Pending" | "Cutting Done" | "Assigned" | "In Progress";
}
