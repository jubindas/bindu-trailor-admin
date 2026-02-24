export type Stitching = {
  // Frontend ID specific
  orderId: string;
  garmentType: string;
  quantity: number;
  metarialCode: string[];
  status: string;
  remarks: string;

  // API specific fields - keeping them optional or matching exact response
  id?: number;
  stitching_order_id?: number | string;
  assign_order_item_id?: string;
  assigned_date?: string;
  deadline?: string;
  order?: any;
  order_item?: any;
  garment_details?: any; // To store flattened garment info
};
