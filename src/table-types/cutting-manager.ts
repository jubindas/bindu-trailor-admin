export interface CuttingOrder {
  id: string;
  orderId: string;
  garment: string[];
  materials: string[];
  qty: number;
  status: "Cutting Pending" | "Cutting Done" | "Assigned" | "In Progress";
}
