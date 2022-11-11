import React from "react";
import {
  ClockIcon,
  IdentificationIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useFirstLoad } from "../../hooks/useFirstLoad";
import SearchField from "../search/SearchInput";
import BackgroundImage from "./BackgroundImage";
import { restaurantModel } from "../../types/restaurantModel";

type Props = {
  restaurant: restaurantModel;
  isOrderingView: boolean;
  searchInputField?: string;
  setSearchInputField?: (keyword: string) => void;
};

function RestaurantHeader({
  restaurant,
  isOrderingView,
  searchInputField,
  setSearchInputField,
}: Props) {
  const isFirstLoad = useFirstLoad();

  return (
    <header>
      <BackgroundImage restaurantImage={restaurant.backgroundImage} />

      <motion.div
        initial={{ y: !isFirstLoad ? 0 : -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.4 }}
        className="m-auto hidden w-2/3 place-items-end pt-56 text-white xl:flex"
      >
        <div className="flex flex-col space-y-4 rounded-xl  backdrop-blur">
          <h1 className="px-2 py-1 text-6xl tracking-wide ">
            {restaurant.restaurantName}
          </h1>
          <p className="px-2 py-1 text-xl text-slate-200">
            {restaurant.shortDescription}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: !isFirstLoad ? 0 : -200, opacity: !isFirstLoad ? 1 : 0 }}
        animate={{ x: 0, opacity: !isFirstLoad ? 1 : [0.1, 0.2, 0.5, 0.8, 1] }}
        transition={{ duration: 1.4 }}
        className="absolute z-10 my-12 hidden w-full justify-between xl:flex"
      >
        <div className="m-auto flex h-20 w-2/3 items-center justify-between rounded-lg bg-white px-4 py-2 shadow-2xl">
          <div className="flex items-center space-x-1 font-semibold">
            <HeartIcon className="mr-0.5 h-5 w-5 text-red-500" />
            <span className="tracking-wide">{restaurant.rating}</span>
          </div>
          <div className="text-slate-600">{restaurant.longDescription}</div>

          {!isOrderingView ? (
            <div>
              <SearchField
                searchInputField={searchInputField!}
                setSearchInputField={setSearchInputField!}
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ x: !isFirstLoad ? 0 : -200, opacity: !isFirstLoad ? 1 : 0 }}
        animate={{ x: 0, opacity: !isFirstLoad ? 1 : [0.1, 0.2, 0.5, 0.8, 1] }}
        transition={{ duration: 1.4 }}
        className="absolute top-32 block w-full xl:hidden"
      >
        <div className="m-auto h-[180px] w-11/12 rounded-lg border-gray-200 bg-white px-4 py-2 shadow-2xl sm:h-40 lg:w-2/3 ">
          <h2 className="semi-bold text-center text-2xl">
            {restaurant.restaurantName}
          </h2>
          <div className="pt-2 text-sm text-gray-500">
            <p className="flex p-1">
              <IdentificationIcon className="mr-1 h-5 w-5" />
              {restaurant.address}
            </p>
            <p className="flex p-1">
              <ClockIcon className="mr-1 h-5 w-5" />
              {restaurant.workingHours}
            </p>
          </div>
          <p className="p-2 text-sm text-gray-500">
            {restaurant.longDescription}
          </p>
        </div>
      </motion.div>
    </header>
  );
}

export default RestaurantHeader;
