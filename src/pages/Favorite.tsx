import Card from "../components/Card";
import AppContext from "./context";
import React from "react";

const Favorite: React.FC<{ addFavorite: any }> = ({ addFavorite }) => {
  // В месте, где хотим использовать наши переменные пишем следующий код
  const { itemFavorite } = React.useContext(AppContext);
  return (
    <>
      <div className="content p-30">
        <div className="input-title d-flex justify-between align-center mb-20"></div>
        <h2>Мои закладки</h2>
        <div className="block-card d-flex justify-between">
          {itemFavorite.map((item: any, index: number) => (
            <Card
              key={item.id}
              favorited={true}
              addFavorite={addFavorite}
              {...item}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorite;
