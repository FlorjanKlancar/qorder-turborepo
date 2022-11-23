import { itemModel } from "./itemModel";

export interface itemsOnOrder {
  amount: number;
  items: itemModel;
}

export interface orderDetailsModel {
  id: number;
  created_at: Date;
  customerComment: string;
  customerTip: number;
  paymentType: string;
  tableNumber: number;
  status: string;
  totalAmount: number;
  itemsOnOrder: itemsOnOrder[];
}
