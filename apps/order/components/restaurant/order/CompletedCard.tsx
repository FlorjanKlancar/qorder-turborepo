import Image from "next/image";
import React from "react";
import { itemsOnOrder } from "../../../types/orderDetailsModel";

type Props = {
  item: itemsOnOrder;
};

function CompletedCard({ item }: Props) {
  return (
    <li key={item.items.id} className="flex items-center py-3">
      <div className="relative h-24 w-44 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={item.items.picture}
          alt={item.items.title}
          fill
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex flex-col justify-between text-base font-medium text-gray-900 sm:flex-row">
            <h3>
              <a>{item.items.title}</a>
            </h3>
            <p className="ml-4 hidden sm:block">
              {(item.items.price * item.amount).toFixed(2)}€
            </p>
          </div>
          <p className="mt-1 hidden text-sm text-gray-500 sm:flex">
            {item.items.description}
          </p>
        </div>
        <div className="flex flex-col font-semibold">
          <p className="mt-2 text-base">
            {item.amount}x
            <span className="ml-1 text-default">
              {item.items.price.toFixed(2)}€
            </span>
          </p>
          <p className="mt-3 sm:hidden">
            {(item.items.price * item.amount).toFixed(2)}€
          </p>
        </div>
      </div>
    </li>
  );
}

export default CompletedCard;
