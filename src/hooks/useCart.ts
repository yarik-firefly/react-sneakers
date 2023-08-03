import { useSelector } from "react-redux";
import AppContext from "../pages/context";
import React from "react";

export const useCart = () => {
  const { itemCart } = useSelector((state: any) => state.cart);

  const { openCart } = React.useContext(AppContext);

  const cartSum = itemCart.length ? itemCart.reduce(
    (sum: number, obj: any) => obj.price + sum,
    0
  ) : 0;

  return { cartSum, openCart };
};
