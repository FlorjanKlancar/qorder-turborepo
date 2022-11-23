import { GetServerSideProps } from "next";
import React, { useState } from "react";
import OrderingLayout from "../../../components/layout/OrderingLayout";
import RestaurantHomePage from "../../../components/restaurant/RestaurantHomePage";
import { restaurantModel } from "../../../types/restaurantModel";
import { checkIfRestaurantExists } from "../../../utils/utilityFunctions";

type Props = {
  restaurant: restaurantModel;
};

function RestaurantTableNumber({ restaurant }: Props) {
  const [searchInputField, setSearchInputField] = useState("");

  return (
    <OrderingLayout
      restaurant={restaurant}
      isOrderingView={false}
      searchInputField={searchInputField}
      setSearchInputField={setSearchInputField}
    >
      <RestaurantHomePage searchInputField={searchInputField} />
    </OrderingLayout>
  );
}

export default RestaurantTableNumber;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { restaurantName, tableNr } = context.params!;

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

  return { props: { restaurant: response } };
};
