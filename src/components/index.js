import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { CardsContext } from "../context/cards/cardsContext";
import Card from "./card";
import style from "./main.module.scss";
import Search from "./search";
import Spiner from "./spiner";

export const Main = () => {
  const { cardsToShow, loader, error } = useContext(CardsContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(cardsToShow);
  }, [cardsToShow]);

  const mainContent = (loader, students) => {
    if (loader) {
      return <Spiner />;
    } else if (!loader && students.length) {
      return students.map((item) => <Card {...item} key={item.id} />);
    } else if (!loader && !students.length) {
      return <div className={style.main__error}><h1>Nothing Found!</h1></div>;
    }
  };

  return (
    <div className={style.main}>
      <Search />
      <div className={style.main__cards}>{mainContent(loader, students)}</div>
    </div>
  );
};
