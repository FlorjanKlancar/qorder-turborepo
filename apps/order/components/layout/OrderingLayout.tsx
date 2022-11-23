import Head from "next/head";
import React, { ReactNode, useContext } from "react";
import RestaurantHeader from "../restaurant/RestaurantHeader";
import SearchField from "../search/SearchInput";
import { motion } from "framer-motion";
import { useFirstLoad } from "../../hooks/useFirstLoad";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import Image from "next/image";
import qOrderLogo from "../../public/assets/Q-Order-Logo.png";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartContext from "../../store/cart-context";
import { useRouter } from "next/router";
import Link from "next/link";
import { restaurantModel } from "../../types/restaurantModel";
import Footer from "../navigation/Footer";

type Props = {
  children: ReactNode;
  restaurant?: restaurantModel;
  isOrderingView: boolean;
  errorTitle?: string;
  searchInputField?: string;
  setSearchInputField?: (keyword: string) => void;
};

function OrderingLayout({
  children,
  restaurant,
  isOrderingView,
  errorTitle,
  searchInputField,
  setSearchInputField,
}: Props) {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;
  const tableNr = router.query.tableNr;

  const isFirstLoad = useFirstLoad();
  const scrollPosition = useScrollPosition();

  const cartCtx = useContext(CartContext);

  return (
    <>
      <Head>
        <title>
          {errorTitle ?? !isOrderingView
            ? restaurant!.restaurantName
            : `${restaurant!.restaurantName} - Order`}
        </title>
      </Head>

      <div
        className={`${
          !isOrderingView ? "sticky " : "relative"
        } top-0 z-30 hidden h-16 w-full items-center justify-center duration-300 xl:flex
      ${scrollPosition && !isOrderingView ? " bg-white" : ""}
  `}
      >
        <nav className="navbar m-auto flex w-2/3">
          <div className="flex w-full items-center justify-between ">
            <div className={`btn-ghost btn relative h-8 w-40`}>
              <Link
                href={{
                  pathname: "/[restaurantName]/[tableNr]",
                  query: { restaurantName, tableNr },
                }}
              >
                <div>
                  <Image src={qOrderLogo} alt="qOrder" height="240" />
                </div>
              </Link>
            </div>
            {cartCtx.items.length ? (
              <Link
                href={{
                  pathname: "/[restaurantName]/[tableNr]/order",
                  query: { restaurantName, tableNr },
                }}
              >
                <div className="btn flex w-48 justify-between border-slate-400 bg-default">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-default">
                    {cartCtx.items.length}
                  </div>
                  <p className="text-lg">{cartCtx.totalAmount.toFixed(2)}€</p>
                  <ShoppingCartIcon className="h-7 w-7 text-white" />
                </div>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </nav>
      </div>
      <RestaurantHeader
        restaurant={restaurant!}
        isOrderingView={isOrderingView}
        searchInputField={searchInputField!}
        setSearchInputField={setSearchInputField!}
      />

      <motion.div
        initial={{ y: isFirstLoad ? 200 : 0, opacity: isFirstLoad ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-[350px] pb-24 sm:mt-80  xl:mt-44 "
      >
        {!isOrderingView ? (
          <div className="px-4 sm:px-16 md:px-32 xl:hidden">
            <SearchField
              searchInputField={searchInputField!}
              setSearchInputField={setSearchInputField!}
            />
          </div>
        ) : (
          <></>
        )}
        <div>{children}</div>
      </motion.div>

      <Footer />
    </>
  );
}

export default OrderingLayout;
