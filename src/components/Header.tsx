import { Link, useLocation } from "react-router-dom";
import AppContext from "../pages/context";
import React from "react";
import { useCart } from "../hooks/useCart";

const Header = (props: any) => {
  const { cartSum } = useCart();
  const { pathname } = useLocation();

  return (
    <div className="header d-flex justify-between p-30">
      <div className="left-bar">
        <Link to="/">
          <div className="d-flex align-center">
            <div className="logo-img cu-p">
              <img width={40} height={40} src="img/logo.png" alt="" />
            </div>
            <div className="title ml-10">
              <h3>REACT SNEAKERS</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="right-bar">
        {pathname === "/" && (
          <>
            <div className="cart cu-p">
              <img onClick={props.onClickCart} src="img/cart.png" alt="" />
            </div>
            <p className="header-sum">{cartSum} UAH</p>
          </>
        )}

        <div className="notes cu-p">
          <Link to="/favorite">
            <img src="img/notes.png" alt="" />
          </Link>
        </div>
        <Link to="/orders">
          <div className="profile cu-p">
            <img src="img/profile.png" alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
