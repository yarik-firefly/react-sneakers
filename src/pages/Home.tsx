import Search from "../components/Search";
import Card from "../components/Card";
import img from "../assets/Carousel.png";

import React from "react";
import AppContext from "./context";

const Home: React.FC<{
  searchValue: string;
  setSearchValue: any;
  onAddToFavorites: any;
  onAddToCart: any;
  sneakers: object[];
  added?: boolean;
  itemCart: object[];
  isLoading: boolean;
}> = ({
  searchValue,
  setSearchValue,
  onAddToFavorites,
  onAddToCart,
  sneakers,
  added = false,
  itemCart,
  isLoading,
}) => {
  const renderSneakers = () => {
    const filteredItems = sneakers.filter((item: any) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(12)] : filteredItems).map(
      (item: any, index) => (
        <Card
          id={item && item.id}
          addFavorite={onAddToFavorites}
          key={item ? item.id : index}
          onPlus={(obj: object) => onAddToCart(obj)}
          {...item}
          isLoading={isLoading}
        />
      )
    );
  };
  return (
    <div className="content p-30">
      <div className="block-carousel">
        <img className="mb-20" src={img} alt="" />
        <button className="btn-buy cu-p">КУПИТЬ</button>
      </div>
      <div className="input-title d-flex justify-between align-center mb-20">
        <h1>Все кроссовки</h1>
        <Search
          searchValue={searchValue}
          onChangeValue={(event: any) => setSearchValue(event.target.value)}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="block-card d-flex justify-between">
        {renderSneakers()}
      </div>
    </div>
  );
};

export default Home;
