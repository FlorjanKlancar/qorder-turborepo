import Image from "next/image";
import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import { itemModel } from "../../../types/itemModel";
import AddToCardButton from "../AddToCardButton";

type Props = {
  item: itemModel;
};

function SingleItemInList({ item }: Props) {
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: itemModel) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const findItemInContext = cartCtx.items.find(
    (itemCtx: itemModel) => itemCtx.id === item.id
  ) ?? { ...item, amount: 0 };

  return (
    <div className="card card-side flex bg-base-100 shadow-xl">
      <figure className="relative h-32 w-96">
        <Image
          src={item.picture}
          alt={item.title}
          fill
          className="object-fill"
        />
      </figure>
      <div className="flex w-full flex-col items-center justify-center  space-y-2 ">
        <h2 className={`text-base font-semibold`}>{item.title}</h2>

        <div>
          {item.amount}x{" "}
          <span className="font-semibold text-default ">
            {item.price.toFixed(2)}€
          </span>
        </div>

        <div>
          <AddToCardButton
            currentItem={findItemInContext}
            onAdd={cartItemAddHandler}
            onRemove={cartItemRemoveHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default SingleItemInList;
