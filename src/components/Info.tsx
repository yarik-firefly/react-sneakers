import React from "react";
import AppContext from "../pages/context";
import BtnBack from "./BtnBack";

const CartEmpty: React.FC<any> = ({ title, description, img }) => {
  return (
    <div className="cartEmpty">
      <div className="img-box">
        <img height={120} src={img} alt="" />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <BtnBack />
    </div>
  );
};

export default CartEmpty;
