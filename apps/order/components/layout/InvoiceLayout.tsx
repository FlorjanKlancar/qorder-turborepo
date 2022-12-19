import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useContext } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { restaurantModel } from "../../types/restaurantModel";
import qOrderLogo from "../../public/assets/Q-Order-Logo.png";
import Footer from "../navigation/Footer";
import CartContext from "../../store/cart-context";

type Props = {
  restaurant: restaurantModel;
  children: ReactNode;
};

function InvoiceLayout({ restaurant, children }: Props) {
  const scrollPosition = useScrollPosition();
  const router = useRouter();
  const cartCtx = useContext(CartContext);

  const restaurantName = router.query.restaurantName;
  const tableNr = router.query.tableNr;

  const clearContextHandler = () => {
    cartCtx.emptyCart();
  };

  return (
    <>
      <Head>
        <title>{`${restaurant!.restaurantName} - Order`}</title>
      </Head>

      <div
        className={`sticky top-0 z-30 hidden h-16 w-full items-center justify-center duration-300 xl:flex ${
          scrollPosition ? "bg-white" : ""
        }`}
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

            <Link
              href={{
                pathname: "/[restaurantName]/[tableNr]",
                query: { restaurantName, tableNr },
              }}
            >
              <button
                className="btn-outline btn border-default text-default"
                onClick={clearContextHandler}
              >
                Order Again
              </button>
            </Link>
          </div>
        </nav>
      </div>
      <div className="min-h-[calc(100vh-7rem)] px-4 sm:px-8 lg:px-48 xl:px-96">
        {children}
      </div>

      <Footer />
    </>
  );
}

export default InvoiceLayout;
