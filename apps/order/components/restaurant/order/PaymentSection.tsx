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
  handleSubmit: (e: React.MouseEvent<HTMLInputElement>) => void;
  comment: string;
  errorMsg: string;
  setErrorMsg: (msg: string) => void;
};

function PaymentSection({
  paymentMethod,
  setPaymentMethod,
  cartCtx,
  handleSubmit,
  comment,
  errorMsg,
  setErrorMsg,
}: Props) {
  return (
    <div className="my-8">
      <div id="payment_header" className="my-5">
        <h2>Payment method</h2>
      </div>

      {errorMsg.length ? (
        <div className="alert alert-error my-3 shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMsg}</span>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className={`btn-ghost btn gap-2 border-slate-400 ${
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
          className={`btn-ghost btn gap-2 border-slate-400 ${
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
          <StripeForm
            cartCtx={cartCtx}
            comment={comment}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
        </div>
      ) : (
        <OrderButton
          totalAmount={cartCtx.totalAmount}
          disabled={false}
          handleSubmit={handleSubmit}
          errorMsg={errorMsg}
        />
      )}
    </div>
  );
}

export default PaymentSection;
