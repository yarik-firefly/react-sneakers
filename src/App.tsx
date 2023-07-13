import React from "react";
import "./scss/header.scss";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import axios from "axios";
import Home from "./pages/Home";
import { Routes, Route, Link } from "react-router-dom";
import Favorite from "./pages/Favorite";
import AppContext from "./pages/context";
import Orders from "./pages/Orders/Orders";

const App: React.FC = () => {
  const [sneakers, setSneakers] = React.useState([]);
  const [itemCart, setItemCart] = React.useState<object[]>([]);
  const [itemFavorite, setItemFavorite] = React.useState<object[]>([]);
  const [openCart, setOpenCart] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [cartResponse, favResponse, sneakersResponse] = await Promise.all(
          [
            axios.get("https://64aa95030c6d844abede97df.mockapi.io/cart"),
            axios.get("https://64aa95030c6d844abede97df.mockapi.io/favorite"),
            axios.get("https://6490ad001e6aa71680cba4bb.mockapi.io/sneakers"),
          ]
        );

        setIsLoading(false);

        setItemCart(cartResponse.data);
        setItemFavorite(favResponse.data);
        setSneakers(sneakersResponse.data);
      } catch (error) {
        alert("Не удалось загрузить товары");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj: any) => {
    try {
      const findItem: any = itemCart.find(
        (item: any) => +item.parentId === +obj.id
      );
      if (findItem) {
        setItemCart((prev) =>
          prev.filter(
            (itemCart: any) => Number(itemCart.parentId) !== Number(obj.id)
          )
        );
        await axios.delete(
          `https://64aa95030c6d844abede97df.mockapi.io/cart/${findItem.id}`
        );

        console.log(obj);
      } else {
        setItemCart((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://64aa95030c6d844abede97df.mockapi.io/cart",
          obj
        );
        setItemCart((prev) =>
          prev.map((item: any) => {
            if (+item.parentId === +data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину :(");
    }
  };

  const onAddToFavorites = async (item: any) => {
    try {
      if (itemFavorite.find((obj: any) => obj.id === item.id)) {
        axios.delete(
          `https://64aa95030c6d844abede97df.mockapi.io/favorite/${item.id}`
        );
        setItemFavorite((prev) =>
          prev.filter((itemFav: any) => itemFav.id !== item.id)
        );
      } else {
        const { data } = await axios.post(
          "https://64aa95030c6d844abede97df.mockapi.io/favorite",
          item
        );

        setItemFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в закладки");
    }
  };

  const deleteFromCart = async (id: string) => {
    try {
      await axios.delete(
        `https://64aa95030c6d844abede97df.mockapi.io/cart/${id}`
      );
      setItemCart((prev) => prev.filter((item: any) => +item.id !== +id));
    } catch (error) {
      alert("Ошибка при удалении из корзины");
    }
  };

  const isItemAdded = (id: string) => {
    return itemCart.some((obj: any) => obj.parentId === id);
  };
  return (
    <AppContext.Provider
      value={{
        sneakers,
        itemCart,
        itemFavorite,
        openCart,
        isItemAdded,
        setOpenCart,
        setItemCart,
        onAddToFavorites,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          itemCart={itemCart}
          onCloseCart={() => setOpenCart(!openCart)}
          deleteFromCart={deleteFromCart}
        />

        <Header onClickCart={() => setOpenCart(!openCart)} />
        <Routes>
          <Route
            path=""
            element={
              <Home
                itemCart={itemCart}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onAddToFavorites={onAddToFavorites}
                onAddToCart={onAddToCart}
                sneakers={sneakers}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="favorite"
            element={<Favorite addFavorite={onAddToFavorites} />}
          />

          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;

