export interface Order {
  id: number;
  orderNo: string;
  garmentType: string;
  materialCodes: string[];
  quantity: number;
  status: "Cutting Pending" | "Cutting Done";
  assignedTo?: string;
}

export interface Stitcher {
  name: string;
}
