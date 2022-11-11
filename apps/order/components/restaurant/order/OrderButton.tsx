import React from "react";

type Props = {
  totalAmount: number;
  disabled: boolean;
  handleSubmit?: (e: any) => void;
  isLoading?: boolean;
};

function OrderButton({
  totalAmount,
  disabled,
  handleSubmit,
  isLoading,
}: Props) {
  return (
    <button
      type="submit"
      onClick={handleSubmit ? handleSubmit : () => {}}
      className="btn mt-4 w-full border-default/80 bg-default/90 text-white hover:border-default hover:bg-default"
      disabled={disabled || isLoading ? true : false}
    >
      {!isLoading ? `Order now (${totalAmount.toFixed(2)}€)` : "Processing..."}
    </button>
  );
}

export default OrderButton;
