import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export const useRestaurantInfo = (restaurantQuery: string) => {
  return useQuery(
    ["restaurantInfo"],
    async () => {
      try {
        const response = await supabase
          .from("restaurant")
          .select("*")
          .eq("queryName", restaurantQuery);

        return response.data;
      } catch (e: React.MouseEvent<HTMLInputElement>) {
        console.error(e);
      }
    },
    {
      // The query will not execute until the restaurantQuery exists
      enabled: !!restaurantQuery,
    }
  );
};
