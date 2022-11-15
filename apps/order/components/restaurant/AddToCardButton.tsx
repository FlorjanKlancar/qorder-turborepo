import React from "react";
import { itemModel } from "../../types/itemModel";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { Button } from "ui";

type Props = {
  currentItem: itemModel;
  onRemove: (id: string) => void;
  onAdd: (item: itemModel) => void;
};

function AddToCardButton({ currentItem, onRemove, onAdd }: Props) {
  return (
    <>
      {!currentItem.amount ? (
        <Button
          buttonSize="sm"
          buttonText="Add to cart"
          buttonType="orderButton"
          onClick={(e) => {
            e.stopPropagation();
            onAdd(currentItem);
          }}
        />
      ) : (
        <div className="flex h-8 items-center space-x-2 rounded-xl bg-slate-200 p-2">
          <button className="btn-outline btn-xs btn-circle btn">
            <MinusIcon
              className="h-4 w-4"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(currentItem.id);
              }}
            />
          </button>
          <button className="w-8">{currentItem.amount}</button>
          <button
            className="btn-outline btn-xs btn-circle btn"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(currentItem);
            }}
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}

export default AddToCardButton;
