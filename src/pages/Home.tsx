import Search from "../components/Search";
import Card from "../components/Card";
import img from "../assets/Carousel.png";

import React from "react";
import { useSelector } from "react-redux";

const Home: React.FC<{
  searchValue: string;
  setSearchValue: any;
  onAddToFavorites: any;
  added?: boolean;
  itemCart: object[];
  isLoading: boolean;
}> = ({
  setSearchValue,
  onAddToFavorites,

  added = false,
  itemCart,
  isLoading,
}) => {
  const { sneakers, status, searchValue } = useSelector(
    (state: any) => state.sneakers
  );
  const renderSneakers = () => {
    const filteredItems = sneakers.filter((item: any) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (status === "loading" ? [...Array(12)] : filteredItems).map(
      (item: any, index: number) => (
        <Card
          id={item && item.id}
          addFavorite={onAddToFavorites}
          key={item ? item.id : index}
          {...item}
          isLoading={isLoading}
          icoPlus
        />
      )
    );
  };
  return (
    <div className="content p-30">
      <div className="block-carousel">
        <img className="img-carousel mb-20" src={img} alt="" />
        <button className="btn-buy cu-p">КУПИТЬ</button>
      </div>
      <div className="input-title d-flex justify-between align-center mb-20">
        <h1>Все кроссовки</h1>
        <Search />
      </div>
      <div className="block-card d-flex justify-between">
        {renderSneakers()}
      </div>
    </div>
  );
};

export default Home;
