import React from "react";
import { cartCtxModel } from "../../../types/cartCtxModel";
import { itemModel } from "../../../types/itemModel";

type Props = {
  cartCtx: cartCtxModel;
};

function OrderInTotal({ cartCtx }: Props) {
  return (
    <div className="my-6 flex flex-col space-y-4">
      <div id="order_total_header">
        <h2>Prices in EUR, incl. taxes</h2>
      </div>

      <div className="rounded-xl border-2 border-slate-400 border-opacity-60 bg-white shadow-xl">
        <ul>
          <div className="my-3">
            {cartCtx.items.map((item: itemModel, i: number) => (
              <li key={i}>
                <div className="grid grid-cols-2 justify-center px-32 text-center text-base ">
                  <div>{item.title}</div>
                  <div className="text-right">
                    {item.amount}x
                    <span className="ml-1">{item.price.toFixed(2)}€</span>
                  </div>
                </div>
              </li>
            ))}
          </div>
          <li className="border-t-2 border-slate-400 border-opacity-60	">
            <div className="my-3 grid grid-cols-2 items-center justify-center	 px-32 text-center align-middle text-xl font-bold capitalize text-black">
              <div className="">In total:</div>
              <div className="text-right">
                {cartCtx.totalAmount.toFixed(2)}€
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrderInTotal;
