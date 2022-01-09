import React from "react";
import style from "./loder.module.scss";

const Spiner = () => {
  return (
    <div className={style.container}>
      <div className={style.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spiner;
