import React, { useState } from "react";
import { useItems } from "../../../hooks/useItems";
import { itemModel } from "../../../types/itemModel";
import MainCardSkeleton from "../../skeletons/MainCardSkeleton";
import MainCard from "./MainCard";

type Props = {
  searchInputField?: string;
};

function MainSection({ searchInputField }: Props) {
  const { data, isLoading, isError } = useItems();

  if (isLoading)
    return (
      <div className="mt-3 flex flex-col space-y-5 px-4 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0 2xl:grid-cols-3">
        <MainCardSkeleton numberOfSkeletonCards={10} />
      </div>
    );

  if (isError) return <div>Error: {isError}</div>;

  const groupBy = (items: any[], key: string) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );

  const groupedItems = groupBy(
    data!.filter((item: itemModel) => {
      if (!searchInputField) return item;
      else if (
        item.title.toLowerCase().includes(searchInputField.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchInputField.toLowerCase())
      )
        return item;
    }),
    "type"
  );

  return (
    <main className="flex flex-col px-4 sm:px-16 md:px-32 lg:px-48 xl:px-96">
      {Object.keys(groupedItems).map((key: string, i: number) => (
        <div key={i}>
          <div id={`${key.toLowerCase()}_header`} className="mx-4" key={i}>
            {key}
          </div>
          <div className="mt-3 flex flex-col space-y-5 px-4 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0 2xl:grid-cols-3">
            {groupedItems[key].map((item: itemModel, i: number) => (
              <MainCard item={item} key={i} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

export default MainSection;
