import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import { itemModel } from "../../../types/itemModel";
import AddToCardButton from "../AddToCardButton";

type TopPicksCardProps = {
  topPick: itemModel;
  openModalWithSelectedItem: (item: itemModel) => void;
};

function TopPicksCard({
  topPick,
  openModalWithSelectedItem,
}: TopPicksCardProps) {
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: itemModel) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const findItemInContext = cartCtx.items.find(
    (itemCtx: itemModel) => itemCtx.id === topPick.id
  ) ?? { ...topPick, amount: 0 };
  return (
    <>
      <div className="shrink-0 snap-center snap-always items-center">
        <div className="h-68 card w-60 bg-base-100 shadow-xl">
          <figure
            className="relative h-32 w-full"
            onClick={() => openModalWithSelectedItem(findItemInContext)}
          >
            <Image src={topPick.picture} alt={topPick.title} fill />
          </figure>
          <div
            className="card-body flex items-center"
            onClick={() => openModalWithSelectedItem(findItemInContext)}
          >
            <h2
              className={`card-title -mt-4 ${
                topPick.title.length < 24 ? "text-base" : "truncate text-sm"
              }`}
            >
              {topPick.title}
            </h2>

            <div className="flex w-full items-center justify-between">
              <div className="card-actions text-sm">
                €{topPick.price.toFixed(2)}
              </div>
              <div className="card-actions flex justify-end">
                {topPick.recommendation && (
                  <div className="badge-primary badge-outline badge">Top</div>
                )}
                <div className="badge-secondary badge">{topPick.type}</div>
              </div>
            </div>
          </div>
          <div className="my-2 -mt-6 flex w-full justify-center justify-items-center px-4">
            <AddToCardButton
              currentItem={findItemInContext}
              onAdd={cartItemAddHandler}
              onRemove={cartItemRemoveHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TopPicksCard;
