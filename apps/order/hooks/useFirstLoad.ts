import { useEffect } from "react";

let isFirstLoad = true;

export const useFirstLoad = () => {
  useEffect(() => {
    isFirstLoad = false;
  }, []);

  return isFirstLoad;
};
