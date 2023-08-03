import React from "react";
import MySkeleton from "./Skeleton";
import AppContext from "../pages/context";
import { useDispatch, useSelector } from "react-redux";
import { axiosCartPost } from "../redux/slices/itemCartSlice";
import {
  axiosFavoritePost,
  setFillHeart,
} from "../redux/slices/itemFavoriteSlice";

const Card: React.FC<{
  title: string;
  price: number;
  imgUrl: string;
  onPlus?: any;
  addFavorite: any;
  favorited?: boolean;
  added: boolean;
  id: string;
  isLoading: boolean;
  icoPlus: boolean;
}> = ({
  title,
  price,
  imgUrl,
  onPlus,
  addFavorite,
  favorited,
  id,
  icoPlus,
}) => {
  const { isItemAdded } = React.useContext(AppContext);
  // const { fillHeart } = useSelector((state: any) => state.favorite);
  const dispatch = useDispatch();

  const obj = { title, price, imgUrl, id, parentId: id };

  const [fillHeart, setFillHeart] = React.useState(favorited);
  const changeColorHeart = () => {
    //@ts-ignore
    dispatch(axiosFavoritePost(obj) as any);
    setFillHeart(!fillHeart);
  };

  const addToCartHandle = (obj: any) => {
    //@ts-ignore
    dispatch(axiosCartPost(obj) as any);
  };
  const { status } = useSelector((state: any) => state.sneakers);
  const { statusGet } = useSelector((state: any) => state.orders);

  return (
    <div className="card p-15 mb-30">
      {status === "loading" || statusGet === "loading" ? (
        <MySkeleton key={id} />
      ) : (
        <>
          {addFavorite && (
            <img
              className="notesSimp"
              src={fillHeart ? "img/notes-choose.png" : "img/notes-simple.png"}
              onClick={changeColorHeart}
              alt="ico"
            />
          )}
          <img width={133} height={112} src={imgUrl} />
          <div className="title-shoes mt-30">{title}</div>
          <div className="describe mt-15">
            <div className="price d-flex">
              <span>Цена:</span>
              <b>{price} UAH</b>
            </div>
            <div className="btn">
              {icoPlus && (
                <img
                  width={32}
                  src={
                    isItemAdded(id) ? "img/btn-done.svg" : "img/button-plus.png"
                  }
                  alt="Close"
                  onClick={() => {
                    addToCartHandle(obj);
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
