import Image from "next/image";
import React from "react";
import { itemsOnOrder } from "../../../types/orderDetailsModel";

type Props = {
  item: itemsOnOrder;
};

function CompletedCard({ item }: Props) {
  return (
    <li key={item.items.id} className="flex py-6">
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
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a>{item.items.title}</a>
            </h3>
            <p className="ml-4">{item.items.price.toFixed(2)}€</p>
          </div>
          <p className="mt-1 hidden text-sm text-gray-500 sm:flex">
            {item.items.description}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">
            {item.amount}x
            <span className="ml-1">{item.items.price.toFixed(2)}€</span>
          </p>
        </div>
      </div>
    </li>
  );
}

export default CompletedCard;
