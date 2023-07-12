import React from "react";
import AppContext from "../pages/context";

const CartEmpty: React.FC<any> = ({title, description, img}) => {

  const { setOpenCart } = React.useContext(AppContext)
  return (
    <div className="cartEmpty">
      <div className="img-box">
        <img height={120} src={img} alt="" />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="btn-back">
        <button onClick={() => setOpenCart(false)} className="btnOrder back">
          <img className="arrow-back-ico" src="img/arrow-back.png" />
          Вернуться назад
        </button>
      </div>
    </div>
  );
};

export default CartEmpty;
