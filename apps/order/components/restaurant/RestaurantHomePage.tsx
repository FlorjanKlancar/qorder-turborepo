import React from "react";
import MainSection from "./mainSection/MainSection";
import TopPicksSection from "./topPicks/TopPicksSection";

type Props = {
  searchInputField?: string;
};

function RestaurantHomePage({ searchInputField }: Props) {
  return (
    <div className="m-auto">
      <div id="toppicks_header" className="mx-4">
        Top picks
      </div>
      <TopPicksSection />

      <MainSection searchInputField={searchInputField} />
    </div>
  );
}

export default RestaurantHomePage;
