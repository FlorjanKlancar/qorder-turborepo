// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { itemModel } from "../../../types/itemModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = require("stripe")(process.env.NEXT_STRIPE_SK);

  switch (req.method) {
    case "POST":
      {
        const { items } = req.body;

        const getAmountToPay = items.reduce(
          (prev: number, cur: itemModel) => prev + cur.price * cur.amount!,
          0
        );

        const paymentIntent = await stripe.paymentIntents.create({
          amount: getAmountToPay * 100,
          currency: "eur",
        });

        res.status(200).json(paymentIntent);
      }
      break;

    default:
  }
}
