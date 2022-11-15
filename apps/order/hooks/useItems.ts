import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

export const useItems = () => {
  return useQuery(["items"], async () => {
    try {
      const response = await supabase.from("items").select("*");

      return response.data;
    } catch (e: React.MouseEvent<HTMLInputElement>) {
      console.error(e);
    }
  });
};
