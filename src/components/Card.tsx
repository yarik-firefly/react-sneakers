import React from "react";
import MySkeleton from "./Skeleton";
import AppContext from "../pages/context";

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
}> = ({
  title,
  price,
  imgUrl,
  onPlus,
  addFavorite,
  favorited,
  id,
  isLoading,
}) => {
  const { isItemAdded } = React.useContext(AppContext);

  const obj = { title, price, imgUrl, id, parentId: id };

  const [fillHeart, setFillHeart] = React.useState(favorited);
  const changeColorHeart = () => {
    addFavorite(obj);
    setFillHeart(!fillHeart);
  };

  return (
    <div className="card p-15 mb-30">
      {isLoading ? (
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
              {onPlus && (
                <img
                  width={32}
                  src={
                    isItemAdded(id) ? "img/btn-done.svg" : "img/button-plus.png"
                  }
                  alt="Close"
                  onClick={() => {
                    onPlus(obj);
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
