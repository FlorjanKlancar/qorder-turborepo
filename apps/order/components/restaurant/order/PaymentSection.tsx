import React from "react";
import { motion } from "framer-motion";
import {
  BanknotesIcon,
  CheckIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import StripeForm from "./StripeForm";
import OrderButton from "./OrderButton";
import { cartCtxModel } from "../../../types/cartCtxModel";

type Props = {
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  cartCtx: cartCtxModel;
  handleSubmit: (e: any) => void;
  comment: string;
};

function PaymentSection({
  paymentMethod,
  setPaymentMethod,
  cartCtx,
  handleSubmit,
  comment,
}: Props) {
  return (
    <div className="my-8">
      <div id="payment_header" className="my-5">
        <h2>Payment method</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className={`btn btn-ghost gap-2 border-slate-400 ${
            paymentMethod === "cash"
              ? "border-default/80 hover:border-default/90 hover:bg-slate-300  hover:text-default"
              : ""
          }`}
          onClick={() => setPaymentMethod("cash")}
        >
          <BanknotesIcon className="h-6 w-6" />
          Cash
          {paymentMethod === "cash" ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1.2, 1] }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              <CheckIcon className="h-6 w-6 text-emerald-400" />
            </motion.div>
          ) : (
            <></>
          )}
        </button>

        <button
          type="button"
          className={`btn btn-ghost gap-2 border-slate-400 ${
            paymentMethod === "card"
              ? "border-default/80 hover:border-default/90 hover:bg-slate-300  hover:text-default"
              : ""
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          {paymentMethod === "card" ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1.2, 1] }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              <CheckIcon className="h-6 w-6 text-emerald-400" />
            </motion.div>
          ) : (
            <></>
          )}
          Credit Card
          <CreditCardIcon className="h-6 w-6" />
        </button>
      </div>
      {paymentMethod === "card" ? (
        <div className="mt-3">
          <StripeForm cartCtx={cartCtx} comment={comment} />
        </div>
      ) : (
        <OrderButton
          totalAmount={cartCtx.totalAmount}
          disabled={false}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default PaymentSection;
