import React, { useContext } from "react";
import { ShoppingCartIcon, HomeIcon } from "@heroicons/react/24/outline";
import CartContext from "../../store/cart-context";
import { useRouter } from "next/router";
import Link from "next/link";

function BottomNavigation() {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;
  const tableNr = router.query.tableNr;

  const cartCtx = useContext(CartContext);

  const activeLinkCSS =
    "border-t-2 text-default border-default border-opacity-80";
  const nonActiveLinkCSS = "border-t-2 border-slate-600/40";

  return (
    <div className="btm-nav btm-nav-md text-slate-600">
      <Link
        href={{
          pathname: "/[restaurantName]/[tableNr]",
          query: { restaurantName, tableNr },
        }}
        className={
          router.pathname == "/[restaurantName]/[tableNr]"
            ? activeLinkCSS
            : nonActiveLinkCSS
        }
      >
        <button>
          <HomeIcon className="h-6 w-6 " />
        </button>
      </Link>

      <Link
        href={{
          pathname: "/[restaurantName]/[tableNr]/order",
          query: { restaurantName, tableNr },
        }}
        className={`${
          !cartCtx.items.length
            ? "disabled"
            : router.pathname == "/[restaurantName]/[tableNr]/order"
            ? activeLinkCSS
            : nonActiveLinkCSS
        }`}
      >
        <button>
          <div className="indicator">
            {cartCtx.items.length ? (
              <span className="badge badge-sm indicator-end indicator-item border-default bg-default/80 ">
                {cartCtx.items.length}
              </span>
            ) : (
              <></>
            )}
            <ShoppingCartIcon className="h-6 w-6" />
          </div>
        </button>
      </Link>
    </div>
  );
}

export default BottomNavigation;
