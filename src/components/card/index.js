import React, { useState, useEffect } from "react";
import style from "./card.module.scss";
import MinusButton from "../scoreButton";
import { countAverage } from "../../utils/countAverage";
import Grades from "../grades";

const Card = ({
  city,
  email,
  skill,
  company,
  pic,
  grades,
  firstName,
  lastName,
  index,
}) => {
  const [averagePercentage, setAveragePercentage] = useState(null);
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    setAveragePercentage(countAverage(grades));
  }, [grades]);

  const checkForExpand = (value) => {
    if (value === index) {
      setExpand((expand) => !expand);
    }
  };

  return (
    <div>
      <div className={style.card}>
        <div className={style.card__image}>
          <img alt="avatar" src={pic} width="50" height="60"></img>
        </div>
        <div className={style.card__infoContainer}>
          <div className={style.card__personInfo}>
            <h1>{`${firstName} ${lastName}`.toUpperCase()}</h1>
            <div className={style.card__personInfo__email}> Email: {email}</div>
            <div className={style.card__personInfo__company}>
              Company: {company}
            </div>
            <div className={style.card__personInfo__skill}>Skill: {skill}</div>
            <div className={style.card__personInfo__average}>
              Average: {averagePercentage}%
            </div>
            <div className={style[expand ? "collapsed" : "expanded"]}>
              <Grades grades={grades} />
            </div>
          </div>
          <div className={style.card__expandAverage}>
            <MinusButton
              index={index}
              expand={expand}
              setExpand={setExpand}
              checkForExpand={checkForExpand}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
