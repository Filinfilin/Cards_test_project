import React from "react";
import style from "./card.module.scss";

const Card = ({ city, email, skill, company, pic, grades, firstName, lastName}) => {

  return (
    <div>
      <div className={style.card}>
        <div className={style.card__image}>
          <img alt="avatar" src={pic} width="50" height="60"></img>
        </div>
        <div className={style.card__personInfo}>
          <h1>{`${firstName} ${lastName}`.toUpperCase()}</h1>
          <div className={style.card__personInfo__email}> Email: {email}</div>
          <div className={style.card__personInfo__company}>Company: {company}</div>
          <div className={style.card__personInfo__skill}>Skill: {skill}</div>
          <div className={style.card__personInfo__average}>Average: {grades[0]}%</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
