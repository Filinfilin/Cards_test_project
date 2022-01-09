import React, { useContext } from "react";
import { CardContext } from "../context/card/cardContext";
import Card from "./card";
import style from "./main.module.scss";
import Spiner from "./spiner";

export const Main = () => {

  const { data, loader } = useContext(CardContext);

  return (
    <div className={style.main}>
      <div className={style.main__cards}>
        {loader && <Spiner />}
        {!loader &&
          data.map((item, index) => <Card {...item} key={`card-${index}`} />)}
      </div>
    </div>
  );
};
