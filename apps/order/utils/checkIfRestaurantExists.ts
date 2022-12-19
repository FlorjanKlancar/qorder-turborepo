import { restaurantModel } from "../types/restaurantModel";
import { supabase } from "./supabaseClient";

export const checkIfRestaurantExists = async (
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
