import React from "react";
import style from "./grades.module.scss"

const Grades = ({ grades }) => {
  return (
    <>
      {grades.map((item, index) => (
        <div
          className={style.grade}
          key={`grade-${index}`}
        >
          <div className={style.grade__testNumber}>Test {index + 1}:</div>
          <div className={style.grade__percentage}>{item}%</div>
        </div>
      ))}
    </>
  );
};

export default Grades;
