import Image from "next/image";
import React, { useContext, useState } from "react";
import { itemModel } from "../../../types/itemModel";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import CartContext from "../../../store/cart-context";
import AddToCardButton from "../AddToCardButton";

type MainCardProps = {
  item: itemModel;
};

function MainCard({ item }: MainCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const badgeSection = (
    <div className="flex space-x-1">
      {item.isGlutenFree && (
        <div className="badge-outline badge border-lime-600 text-sm text-lime-600">
          Gluten free
        </div>
      )}

      {item.isSpicy && (
        <div className="badge-outline badge border-red-600 text-sm text-red-600">
          Spicy
        </div>
      )}

      {item.isVegan && (
        <div className="badge-outline badge border-green-600 text-sm text-green-600">
          Vegan
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-default/50 via-default/10 to-slate-200 px-0.5 pt-0.5">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`card card-compact w-full rounded-2xl bg-base-100 shadow-xl shadow-slate-400`}
      >
        <figure className={`relative h-40 w-full sm:h-44`}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-5 right-5 z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-slate-500 border-opacity-50"
            >
              <XMarkIcon className="h-5 w-5" />
            </motion.div>
          )}
          <Image src={item.picture} alt={item.title} fill />
        </figure>
        <div className="flex flex-col items-stretch	 px-4 py-2">
          <div>
            <h2 className="card-title">
              {item.title}
              {item.isNew && <div className="badge-secondary badge">NEW</div>}
            </h2>
          </div>

          <div
            className={`flex ${
              !isOpen ? "h-12" : ""
            } items-center py-2 align-middle`}
          >
            <p
              className={`text-sm text-slate-500 ${
                !isOpen ? "line-clamp-2" : ""
              }`}
            >
              {item.description}
            </p>
          </div>

          <div className="items-end">
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card-actions flex items-center justify-between"
              >
                <div className="font-semibold text-default">
                  {item.price.toFixed(2)}€
                </div>

                {badgeSection}
              </motion.div>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.15,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              }}
              transition={{ duration: 1 }}
            >
              <div className="flex w-full justify-end px-4">{badgeSection}</div>

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
                      ? (findItemInContext.amount * item.price).toFixed(2)
                      : item.price.toFixed(2)}
                    €
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MainCard;
