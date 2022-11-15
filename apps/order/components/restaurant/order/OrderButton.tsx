import React from "react";
import { Button } from "ui";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  totalAmount: number;
  disabled: boolean;
  handleSubmit?: (e: React.MouseEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  errorMsg?: string;
};

function OrderButton({
  totalAmount,
  disabled,
  handleSubmit,
  isLoading,
  errorMsg,
}: Props) {
  return (
    <>
      <motion.div
        initial={{
          x: 0,
        }}
        animate={{
          x: errorMsg ? [100, 0, 100, 0] : 0,
        }}
        transition={{ duration: 1 }}
      >
        <div className="mt-4 flex w-full">
          <Button
            buttonSize="md"
            buttonText={
              !isLoading
                ? `Order now (${totalAmount.toFixed(2)}€)`
                : "Processing..."
            }
            disabled={disabled || isLoading || errorMsg ? true : false}
            type="submit"
            buttonType="orderButton"
            onClick={handleSubmit ? handleSubmit : () => {}}
          />
        </div>
      </motion.div>
    </>
  );
}

export default OrderButton;
