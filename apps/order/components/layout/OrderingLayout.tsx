import Head from "next/head";
import React, { ReactNode, useContext } from "react";
import BottomNavigation from "../navigation/BottomNavigation";
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
      <div className="w-1/3 xl:hidden">
        <BottomNavigation />
      </div>

      <footer className="footer  hidden items-center justify-around px-4 pb-2 text-slate-600 lg:flex xl:px-80 2xl:px-60">
        <div className="grid-flow-col items-center">
          <Image src={qOrderLogo} alt="qOrder" height={100} width={150} />
        </div>
        <div>
          <p>Copyright © 2022 - All right reserved</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}

export default OrderingLayout;
