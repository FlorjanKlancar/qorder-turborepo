import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import { itemModel } from "../../../types/itemModel";
import PaymentSection from "./PaymentSection";
import SingleItemInList from "./SingleItemInList";
import { AnimatePresence, motion } from "framer-motion";
import {
  MinusIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import OrderInTotal from "./OrderInTotal";

function OrderList() {
  const router = useRouter();
  const cartCtx = useContext(CartContext);
  const [comment, setComment] = useState({ isShown: false, comment: "" });
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const restaurantName = router.query.restaurantName;
  const tableNr = router.query.tableNr;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="px-4 sm:px-16 md:px-32 lg:px-48 xl:px-96">
      <div id="summary_header" className="my-5">
        <h2>Order in total</h2>
      </div>
      <div className="flex flex-col space-y-3">
        {cartCtx.items.length ? (
          cartCtx.items.map((item: itemModel) => (
            <SingleItemInList item={item} key={item.id} />
          ))
        ) : (
          <div className="text-center	text-lg text-slate-600 underline underline-offset-4 hover:cursor-pointer">
            <Link
              href={{
                pathname: "/[restaurantName]/[tableNr]",
                query: { restaurantName, tableNr },
              }}
            >
              <p>
                No items selected yet... <br />
                Click to select some items!
              </p>
            </Link>
          </div>
        )}
      </div>

      {cartCtx.items.length ? (
        <>
          <div className="mt-5 flex flex-col space-y-4">
            <Link
              href={{
                pathname: "/[restaurantName]/[tableNr]",
                query: { restaurantName, tableNr },
              }}
              className=""
            >
              <div className="flex cursor-pointer items-center text-blue-500 underline underline-offset-4">
                <PlusCircleIcon className="mr-2 h-7 w-7 text-default" />
                Do you want to add more items?
              </div>
            </Link>

            <div className="flex w-full flex-col">
              <div
                className="flex cursor-pointer items-center"
                onClick={() =>
                  setComment({ comment: "", isShown: !comment.isShown })
                }
              >
                {comment.isShown ? (
                  <MinusIcon className="mr-2 h-7 w-7 text-default" />
                ) : (
                  <ChatBubbleOvalLeftEllipsisIcon className="mr-2 h-7 w-7 text-default" />
                )}
                <p className="flex cursor-pointer text-blue-500 underline underline-offset-4">
                  {comment.isShown
                    ? "Remove comment"
                    : "Add a comment to restaurant"}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {comment.isShown && (
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
                    <textarea
                      className="textarea mt-2 w-full"
                      placeholder="Enter your comment for the Restaurant here"
                      value={comment.comment}
                      onChange={(e) =>
                        setComment({ ...comment, comment: e.target.value })
                      }
                    ></textarea>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <OrderInTotal cartCtx={cartCtx} />

          <PaymentSection
            handleSubmit={handleSubmit}
            cartCtx={cartCtx}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            comment={comment.comment}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrderList;
