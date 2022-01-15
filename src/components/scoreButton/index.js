import React from "react";
import minus from "../../minus_icon.png";
import style from "./buttonExpand.module.scss";

const MinusButton = ({ expand, index, checkForExpand }) => {
  const rotateMinus = (value) => {
    checkForExpand(value);
  };

  return (
    <button className={style.buttonExpand} onClick={() => rotateMinus(index)}>
      <img
        className={
          expand ? style.buttonExpand__flipped : style.buttonExpand__unFlipped
        }
        src={minus}
        alt="expand_btn"
      />
      <img
        className={style.buttonExpand__unFlipped
        }
        src={minus}
        alt="expand_btn"
      />
    </button>
  );
};

export default React.memo(MinusButton);
