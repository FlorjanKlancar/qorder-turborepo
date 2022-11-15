import React, { useState } from "react";
import { useItems } from "../../../hooks/useItems";
import { itemModel } from "../../../types/itemModel";
import ModalComponent from "../../modal";
import TopPicksSkeleton from "../../skeletons/TopPicksSkeleton";
import TopPicksCard from "./TopPicksCard";

function TopPicksSection() {
  const { data, isLoading, isError } = useItems();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentlySelectedItem, setCurrentlySelectedItem] = useState<itemModel>(
    {
      recommendation: false,
      id: "",
      price: 0,
      title: "",
      type: "",
      picture: "",
      isGlutenFree: false,
      isSpicy: false,
      isVegan: false,
      isNew: false,
    }
  );

  const favouriteItems = data?.filter((item: itemModel) => item.recommendation);

  if (isLoading) return <TopPicksSkeleton />;

  if (isError) return <div>Error: {isError}</div>;

  const openModalWithSelectedItem = (selectedItem: itemModel) => {
    setCurrentlySelectedItem(selectedItem);
    setOpenModal(true);
  };

  return (
    <div className="relative m-auto flex w-full snap-x snap-mandatory snap-center gap-6 overflow-x-auto px-4 py-3 xl:justify-center">
      {favouriteItems?.map((topPick: itemModel, i: number) => (
        <TopPicksCard
          topPick={topPick}
          key={i}
          openModalWithSelectedItem={openModalWithSelectedItem}
        />
      ))}
      <ModalComponent
        open={openModal}
        setOpen={setOpenModal}
        currentItem={currentlySelectedItem}
      />
    </div>
  );
}

export default TopPicksSection;
