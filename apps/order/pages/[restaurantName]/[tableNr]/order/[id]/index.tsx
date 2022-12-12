import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../../../../public/assets/lottie/waiter.json";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { GetServerSideProps } from "next";
import {
  checkIfRestaurantExists,
  getOrderDetailsFromId,
} from "../../../../../utils/utilityFunctions";
import { restaurantModel } from "../../../../../types/restaurantModel";
import { orderDetailsModel } from "../../../../../types/orderDetailsModel";
import InvoiceLayout from "../../../../../components/layout/InvoiceLayout";
import CompletedCard from "../../../../../components/restaurant/order/CompletedCard";
import { motion } from "framer-motion";
import CartContext from "../../../../../store/cart-context";

type Props = {
  restaurant: restaurantModel;
  orderResponse: orderDetailsModel;
};

const RenderConfetti = () => {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      recycle={false}
      width={width - 20}
      height={height}
      numberOfPieces={1200}
    />
  );
};

function CompletedPaymentComponent({
  restaurant,
  orderResponse: orderDetails,
}: Props) {
  const [confetti, setConfetti] = useState<React.ReactNode>();
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setConfetti(<RenderConfetti />);
    cartCtx.emptyCart();
  }, []);

  return (
    <InvoiceLayout restaurant={restaurant}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vh",
          height: "100vh",
        }}
      >
        {confetti}
      </div>
      <section className="mt-4 items-center text-center text-xl font-medium">
        Thank you for your order on{" "}
        <span className="capitalize text-default underline decoration-default underline-offset-4">
          table {orderDetails.tableNumber}
        </span>{" "}
        we will deliver it to you shortly!
      </section>

      <section className="flex justify-center">
        <div className="h-[340px] w-[300px]">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: [0.2, 0.5, 0.8, 1], y: 0 }}
        transition={{ duration: 0.8 }}
        className="pb-24 xl:pb-12"
      >
        <section className="flex flex-col rounded-lg bg-white px-4 shadow-xl">
          <div id="order_header">
            <h1>Order in total</h1>
          </div>
          <div className="mt-3 flex justify-between capitalize">
            {orderDetails.customerComment ? (
              <div className="mt-4 w-2/3">
                <span className="font-semibold ">Customer comment:</span>{" "}
                {orderDetails.customerComment}
              </div>
            ) : (
              <></>
            )}
            {orderDetails.customerTip ? (
              <div>
                <span className="font-semibold capitalize">Customer tip:</span>{" "}
                {orderDetails.customerTip}€
              </div>
            ) : (
              <></>
            )}
          </div>

          <ul className="divide-y divide-slate-400 ">
            {orderDetails.itemsOnOrder.map((item) => (
              <CompletedCard item={item} key={item.items.id} />
            ))}
          </ul>

          <hr className="w-full rounded-xl border border-slate-800 opacity-60" />
          <div className="my-3 flex justify-between text-lg font-semibold capitalize">
            <div>
              Paid by{" "}
              <span className="capitalize">{orderDetails.paymentType}</span>
            </div>
            <div>In Total: {orderDetails.totalAmount.toFixed(2)}€</div>
          </div>
        </section>
      </motion.div>
    </InvoiceLayout>
  );
}

export default CompletedPaymentComponent;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { restaurantName, tableNr, id: orderId } = context.params!;

  if (!restaurantName || !tableNr)
    return {
      notFound: true,
    };

  const response = await checkIfRestaurantExists(
    restaurantName.toString(),
    +tableNr
  );
  if (!response)
    return {
      notFound: true,
    };

  const orderResponse = await getOrderDetailsFromId(orderId!.toString());
  if (!orderResponse) {
    return {
      redirect: {
        destination: "/order-not-found",
        permanent: false,
      },
    };
  }

  return { props: { restaurant: response, orderResponse } };
};
