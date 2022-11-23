import React from "react";
import { itemModel } from "../types/itemModel";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item: itemModel) => {},
  removeItem: (id: string) => {},
  emptyCart: () => {},
});

export default CartContext;
