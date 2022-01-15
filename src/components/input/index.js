import React from "react";
import style from "./input.module.scss";

const Input = ({onchangeHandler, value, name, onKeyPress, placeHolder}) => {

  return (
    <div className={style.tag}>
      <input
        placeholder={placeHolder}
        onChange={(e) => onchangeHandler(e)}
        onKeyDown={(e) => onKeyPress(e)}
        value={value}
        name={name}
      ></input>
    </div>
  );
};

export default React.memo(Input);
