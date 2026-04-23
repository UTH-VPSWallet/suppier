export interface GetOrderBySupplierReq { Email: string }
export interface GetOrderBySupplierRes {
  ID: number;
  CustomerName: string;
  CustomerEmail: string;
  TotalPrice: number;
  CreatedAt: number;
  Status: number;
  VPS: OrderDetailRes[];
}
export interface OrderDetailRes {
  ID: number;
  VPSID: number;
  Name: string;
  CPU: string;
  RAM: string;
  Storage: string;
  PricePerMonth: number;
  TotalMonth: number;
  PriceAtPurchase: number;
}