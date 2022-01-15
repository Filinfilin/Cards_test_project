import React, { useState, useEffect } from "react";
import style from "./card.module.scss";
import MinusButton from "../scoreButton";
import { countAverage } from "../../utils/countAverage";
import Grades from "../grades";
import Input from "../input";
import { useContext, useMemo } from "react/cjs/react.development";
import { CardsContext } from "../../context/cards/cardsContext";

const Card = ({
  email,
  skill,
  company,
  pic,
  grades,
  firstName,
  lastName,
  id,
  tags,
}) => {
  const { addTag, setNewTag, newTag } = useContext(CardsContext);
  const [averagePercentage, setAveragePercentage] = useState(null);
  const [expand, setExpand] = useState(true);
  const [studentTags, setStudentTags] = useState(tags);

  useEffect(() => {
    setAveragePercentage(countAverage(grades));
  }, [grades]);

  const checkForExpand = (value) => {
    if (value === id) {
      setExpand((expand) => !expand);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      let newTags = addTag({ tag: e.target.value, studentId: +id });
      setNewTag({ studentId: null, newTag: "" });
      setStudentTags(newTags);
    }
  };

  const onchangeHandler = (e) => {
    setNewTag({ ...newTag, [e.target.name]: e.target.value, studentId: +id });
  };

  useEffect(() => {
  }, [studentTags]);

  return (
    <>
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
            <div className={style.card__personInfo__tagContainer}>
              {studentTags.map((item, index) => (
                <div
                  className={style.card__personInfo__tagContainer__tag}
                  key={`studentTag+${item.id + index}`}
                >
                  {item.tag}
                </div>
              ))}
            </div>
            <div>
              <Input
                onchangeHandler={onchangeHandler}
                value={newTag.studentId === +id ? newTag.newTag : ""}
                name="newTag"
                onKeyPress={onKeyPress}
                placeHolder={"Add a tag"}
              />
            </div>
          </div>
          <div className={style.card__expandAverage}>
            <MinusButton
              index={id}
              expand={expand}
              setExpand={setExpand}
              checkForExpand={checkForExpand}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
