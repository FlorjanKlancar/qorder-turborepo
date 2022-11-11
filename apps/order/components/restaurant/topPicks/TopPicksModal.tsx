import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import { itemModel } from "../../../types/itemModel";
import AddToCardButton from "../AddToCardButton";

type Props = {
  currentItem: itemModel;
};

function TopPicksModal({ currentItem }: Props) {
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: itemModel) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const findItemInContext = cartCtx.items.find(
    (itemCtx: itemModel) => itemCtx.id === currentItem.id
  ) ?? { ...currentItem, amount: 0 };

  const badgeSection = (
    <div className="flex space-x-1">
      {currentItem.isGlutenFree && (
        <div className="badge-outline badge border-lime-600 text-sm text-lime-600">
          Gluten free
        </div>
      )}

      {currentItem.isSpicy && (
        <div className="badge-outline badge border-red-600 text-sm text-red-600">
          Spicy
        </div>
      )}

      {currentItem.isVegan && (
        <div className="badge-outline badge border-green-600 text-sm text-green-600">
          Vegan
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        className={`card w-full bg-base-100 shadow-xl shadow-slate-400 `}
      ></div>
      <figure className={`relative h-48 w-full sm:h-44`}>
        <Image src={currentItem.picture} alt={currentItem.title} fill />
        <div
          onClick={() => {}}
          className="absolute top-5 right-5 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-slate-500 border-opacity-50"
        >
          <XMarkIcon className="h-5 w-5" />
        </div>
      </figure>
      <div className="flex flex-col items-stretch px-4 py-2">
        <div>
          <h2 className="card-title">{currentItem.title}</h2>
        </div>

        <div className="py-2">
          <p className={`text-sm text-slate-500`}>{currentItem.description}</p>
        </div>

        {badgeSection}
      </div>
      <div
        className="flex flex-col space-y-2 px-4 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <AddToCardButton
              currentItem={findItemInContext}
              onAdd={cartItemAddHandler}
              onRemove={cartItemRemoveHandler}
            />
          </div>
          <div className="font-semibold text-default">
            {findItemInContext.amount
              ? (findItemInContext.amount * currentItem.price).toFixed(2)
              : currentItem.price.toFixed(2)}
            €
          </div>
        </div>
      </div>
    </>
  );
}

export default TopPicksModal;
