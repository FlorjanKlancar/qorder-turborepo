import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderButton from "./OrderButton";
import { cartCtxModel } from "../../../types/cartCtxModel";
import { useRouter } from "next/router";
import CardSkeleton from "../../skeletons/CardSkeleton";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

type Props = {
  cartCtx: cartCtxModel;
  comment: string;
};

const CheckoutForm = ({ cartCtx, comment }: Props) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tableNr = router.query.tableNr;

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
    } else {
      const response = await axios.post("/api/insertOrder", {
        items: cartCtx.items,
        totalAmount: cartCtx.totalAmount,
        paymentType: "card",
        customerComment: comment,
        customerTip: 0,
        tableNumber: tableNr,
        status: "pending",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      <OrderButton
        totalAmount={cartCtx.totalAmount}
        disabled={!stripe}
        isLoading={isLoading}
      />
    </form>
  );
};

export default function StripeForm({ cartCtx, comment }: Props) {
  const [clientSecret, setClientSecret] = useState<string>("");

  const getClientSecret = async () => {
    const response = await axios.post("/api/paymentIntent", {
      items: cartCtx.items,
    });
    setClientSecret(response.data.client_secret);
  };

  useEffect(() => {
    getClientSecret();
  }, []);

  if (!clientSecret.length) return <CardSkeleton />;

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm comment={comment} cartCtx={cartCtx} />
    </Elements>
  );
}
