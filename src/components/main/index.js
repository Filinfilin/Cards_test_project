import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { CardsContext } from "../../context/cards/cardsContext";
import Card from "../card";
import style from "./main.module.scss";
import Search from "../search";
import Spiner from "../spiner";

const Main = () => {
  const { cardsToShow, spinner, setSpinner } = useContext(CardsContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(cardsToShow);
    setSpinner(false)
  }, [cardsToShow]);

  const mainContent = (loader, students) => {
    if (spinner) {
      return <Spiner />;
    } else if (!spinner && students.length) {
      return students.map((item) => <Card {...item} key={item.id} />);
    } else if (!spinner && !students.length) {
      return (
        <div className={style.main__error}>
          <h1>Nothing Found!</h1>
        </div>
      );
    }
  };

  return (
    <div className={style.main}>
      <div className={style.main__search}>
        <Search placeHolder={"Search by name"} name={"name"} />
        <Search placeHolder={"Search by tag"} name={"tag"} />
      </div>
      <div className={style.main__cards}>{mainContent(spinner, students)}</div>
    </div>
  );
};

export default React.memo(Main);
