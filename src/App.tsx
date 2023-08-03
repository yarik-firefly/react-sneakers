import React from "react";
import "./scss/header.scss";
import Header from "./components/Header";

import Home from "./pages/Home";
import { Routes, Route, Link } from "react-router-dom";
import AppContext from "./pages/context";
import { useDispatch, useSelector } from "react-redux";
import { axiosSneakers } from "./redux/slices/sneakersSlice";
import {
  addToCart,
  axiosCartPost,
  axiosCartGet,
  setItemCart,
  axiosCartDelete,
} from "./redux/slices/itemCartSlice";
import {
  setItemFavorite,
  axiosFavorite,
  axiosFavoritePost,
} from "./redux/slices/itemFavoriteSlice";

const Drawer = React.lazy(
  () => import(/* webpackChunkName: "Drawer" */ "./components/Drawer/Drawer")
);

const Favorite = React.lazy(
  () => import(/* webpackChunkName: "Favorite" */ "./pages/Favorite")
);

const Orders = React.lazy(
  () => import(/* webpackChunkName: "Favorite" */ "./pages/Orders/Orders")
);
const App: React.FC = () => {
  const [openCart, setOpenCart] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const { sneakers } = useSelector((state: any) => state.sneakers);
  const { itemCart } = useSelector((state: any) => state.cart);
  const { itemFavorite } = useSelector((state: any) => state.favorite);

  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const [] = await Promise.all([
  //         axios.get("https://64aa95030c6d844abede97df.mockapi.io/favorite"),
  //       ]);

  //       setIsLoading(false);

  //       // setItemCart(cartResponse.data);
  //       // setItemFavorite(favResponse.data);
  //     } catch (error) {
  //       alert("Не удалось загрузить товары");
  //     }
  //   }

  //   fetchData();
  // }, []);

  React.useEffect(() => {
    dispatch(axiosSneakers() as any);
    dispatch(axiosCartGet() as any);
    dispatch(axiosFavorite() as any);
  }, []);

  const onAddToFavorites = async (item: any) => {
    //@ts-ignore
    dispatch(axiosFavoritePost(item) as any);
  };

  const deleteFromCart = async (id: string) => {
    //@ts-ignore
    await dispatch(axiosCartDelete(id) as any);
  };

  const isItemFavorite = (id: string) => {
    return itemFavorite.find((obj: any) => obj.parentId === id);
  };

  const isItemAdded = (id: string) => {
    return itemCart.find((obj: any) => obj.parentId === id);
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
        onAddToFavorites,
      }}
    >
      <div className="wrapper clear">
        <Drawer
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
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="favorite"
            element={
              <React.Suspense fallback={<div>Загрузка...</div>}>
                <Favorite addFavorite={onAddToFavorites} />
              </React.Suspense>
            }
          />

          <Route
            path="orders"
            element={
              <React.Suspense fallback={<div>Загрузка...</div>}>
                <Orders />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
