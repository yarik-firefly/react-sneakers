import React from "react";
import Info from "../Info";
import AppContext from "../../pages/context";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from "./Drawer.module.scss";

const Drawer: React.FC<{
  onCloseCart: any;
  itemCart: object[];
  deleteFromCart: any;
}> = ({ deleteFromCart, onCloseCart }) => {
  const delay = (ms: number) => {
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const { itemCart, cartSum, setItemCart, openCart } = useCart();

  const [isOrderComplited, setIsOrderComplited] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const clickOnOrderBtn = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://64ad3197b470006a5ec58319.mockapi.io/orders",
        { items: itemCart }
      );
      setOrderId(data.id);
      setIsOrderComplited(true);
      setItemCart([]);

      for (let i = 0; i < itemCart.length; i++) {
        const item = itemCart[i];
        await axios.delete(
          "https://64aa95030c6d844abede97df.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось оформить заказ :(");
    }
    setLoading(false);
  };

  return (
    <div
      className={`${styles.overlay} ${openCart ? styles.overlayVisible : ""}`}
    >
      <div className={`${styles.drawer} p-30`}>
        <h2 className="pl-25 mb-30 d-flex justify-between align-items">
          Корзина
          <img
            className="cu-p"
            onClick={() => onCloseCart()}
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {itemCart.length < 1 ? (
          <Info
            title={isOrderComplited ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplited
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            img={
              isOrderComplited
                ? "img/order-complite.png"
                : "img/cardboard-box.png"
            }
          />
        ) : (
          <>
            <div className="items">
              {itemCart.map((item: any) => (
                <div
                  key={item.id}
                  className="cartItem d-flex align-center m-auto mb-15"
                >
                  <div
                    style={{ backgroundImage: `url(${item.imgUrl})` }}
                    className="cartItemiIco mr-20"
                  ></div>
                  <ul>
                    <li>
                      {item.title}
                      <>
                        <br />
                      </>
                    </li>
                    <li>
                      <b>{item.price} UAH</b>
                    </li>
                  </ul>
                  <img
                    onClick={() => deleteFromCart(item.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartFooterBlock">
              <ul className="cartFooter">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{cartSum} UAH</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((cartSum / 100) * 5)} UAH</b>
                </li>
              </ul>
            </div>
            <button
              onClick={clickOnOrderBtn}
              className="btnOrder"
              disabled={loading}
            >
              Оформить Заказ
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7H14.7143"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.71436 1L14.7144 7L8.71436 13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Drawer;
