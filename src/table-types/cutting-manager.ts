export interface CuttingOrder {
  id: string;
  orderNo: string;
  garment: string;
  materials: string[];
  qty: number;
  status: "Cutting Pending" | "Cutting Done" | "Assigned" | "In Progress";
}
