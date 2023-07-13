import React from "react";
import AppContext from "../pages/context";

const BtnBack = () => {
  const { setOpenCart } = React.useContext(AppContext);
  return (
    <div className="btn-back">
      <button onClick={() => setOpenCart(false)} className="btnOrder back">
        <img className="arrow-back-ico" src="img/arrow-back.png" />
        Вернуться назад
      </button>
    </div>
  );
};

export default BtnBack;
