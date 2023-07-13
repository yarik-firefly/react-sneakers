import React from "react";
import styles from "../pages/Orders/Orders.module.scss";
import { Link } from "react-router-dom";
import BtnBack from "./BtnBack";

const EmptyInfo = ({title, description, img}: any) => {
  return (
    <div className="info">
      <img
        className={`${styles.sadSmile}`}
        src={img}
        alt=""
      />
      <h3>{title}</h3>
      <p>
        {description}
      </p>
      <Link to="/">
        <BtnBack />
      </Link>
    </div>
  );
};

export default EmptyInfo;
