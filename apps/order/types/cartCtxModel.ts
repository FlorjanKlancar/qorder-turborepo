import { itemModel } from "./itemModel";

export interface cartCtxModel {
  items: itemModel[];
  totalAmount: number;
  addItem: (item: itemModel) => void;
  removeItem: (id: string) => void;
}
