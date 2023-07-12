import AppContext from "../pages/context";
import React from "react";

export const useCart = () => {
  const { itemCart, setItemCart, openCart } = React.useContext(AppContext);

  const cartSum = itemCart.reduce(
    (sum: number, obj: any) => obj.price + sum,
    0
  );

  return { itemCart, setItemCart, cartSum, openCart };
};
