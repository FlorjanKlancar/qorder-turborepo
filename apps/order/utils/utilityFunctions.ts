import { orderDetailsModel } from "../types/orderDetailsModel";
import { restaurantModel } from "../types/restaurantModel";
import { supabase } from "./supabaseClient";
import { supabaseService } from "./supabaseService";

const checkIfRestaurantExists = async (
  restaurantQuery: string,
  tableNr: number
) => {
  const { data } = await supabase
    .from("restaurant")
    .select("*")
    .eq("queryName", restaurantQuery);

  if (!data?.length) return false;

  const restaurantInfo: restaurantModel = data[0];

  if (!(tableNr <= restaurantInfo.maxTableNr)) return false;

  return restaurantInfo;
};

const getOrderDetailsFromId = async (id: string) => {
  // prettier-ignore
  const { data } = await supabaseService
    .from("orders")
    .select(`*, itemsOnOrder (amount, items (*))`)
    .eq("id", id);

  if (!data) return;

  const orderDetails: orderDetailsModel = data[0];
  return orderDetails;
};

export { checkIfRestaurantExists, getOrderDetailsFromId };
