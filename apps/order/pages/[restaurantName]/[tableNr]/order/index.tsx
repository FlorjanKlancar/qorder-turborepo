import { GetServerSideProps } from "next";
import React from "react";
import OrderingLayout from "../../../../components/layout/OrderingLayout";
import RestaurantOrderPage from "../../../../components/restaurant/RestaurantOrderPage";
import { restaurantModel } from "../../../../types/restaurantModel";
import { checkIfRestaurantExists } from "../../../../utils/checkIfRestaurantExists";

type Props = {
  restaurant: restaurantModel;
};

function OrderPage({ restaurant }: Props) {
  return (
    <OrderingLayout restaurant={restaurant} isOrderingView={true}>
      <RestaurantOrderPage />
    </OrderingLayout>
  );
}

export default OrderPage;

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
