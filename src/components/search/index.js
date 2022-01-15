import React, { useContext, useEffect } from "react";
import { CardsContext } from "../../context/cards/cardsContext";
import style from "./search.module.scss";
import Input from "../input";

const Search = ({ name, placeHolder }) => {
  const { setSearch, search } = useContext(CardsContext);

  const onKeyPress = () => {
    return;
  };

  const onchangeHandler = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <div className={style.search}>
      <Input
        placeHolder={placeHolder}
        onchangeHandler={onchangeHandler}
        name={name}
        value={name == "name" ? search.name : search.tag}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default React.memo(Search);
