import axios from "axios";
import Card from "../components/Card";
import AppContext from "./context";
import React from "react";

const Orders: React.FC = () => {
  const [orders, setOrders] = React.useState([]);
  const { itemFavorite } = React.useContext(AppContext);
  const { onAddToFavorites, onAddToCart } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://64ad3197b470006a5ec58319.mockapi.io/orders"
        );
        // Или таким методом
        setOrders(
          data.reduce((prev: any, obj: any) => [...prev, ...obj.items], [])
        );
        setIsLoading(false);
      } catch (error) {
        alert("Не удалось получить ваши заказы");
      }
    })();
  }, []);
  return (
    <>
      <div className="content p-30">
        <div className="input-title d-flex justify-between align-center mb-20"></div>
        <h2>Мои заказы</h2>
        <div className="block-card d-flex justify-between">
          {(isLoading ? [...Array(12)] : orders).map(
            (item: any, index: number) => (
              <Card
                id={item && item.id}
                key={item ? item.id : index}
                {...item}
                isLoading={isLoading}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
