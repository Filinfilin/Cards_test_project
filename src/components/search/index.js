import React, { useContext } from "react";
import { CardsContext } from "../../context/cards/cardsContext";
import style from "./search.module.scss";

const Search = () => {
  const { setSearchedString, searchedString } = useContext(CardsContext);
  const onchangeHandle = (value) => {
    setSearchedString(value);
  };
  return (
    <div className={style.search}>
      <input
        placeholder="Search by name"
        onChange={(e) => onchangeHandle(e.target.value.trim())}
        value={searchedString}
      ></input>
    </div>
  );
};

export default Search;
