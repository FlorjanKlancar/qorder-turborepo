// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { itemModel } from "../../../types/itemModel";
import { supabase } from "../../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      {
        const {
          items,
          totalAmount,
          paymentType,
          customerComment,
          customerTip,
          tableNumber,
          status,
        } = req.body;

        const response: any = await supabase
          .from("orders")
          .insert({
            totalAmount,
            paymentType,
            customerComment,
            customerTip,
            tableNumber,
            status,
          })
          .select("*");

        if (response.status !== 201) {
          return res.status(response.status).json(response.error);
        }

        items.forEach(async (item: itemModel) => {
          await supabase.from("itemsOnOrder").insert({
            itemId: item.id,
            orderId: response.data[0].id,
            amount: item.amount,
          });
        });

        res.status(200).json(response);
      }
      break;

    default:
  }
}
