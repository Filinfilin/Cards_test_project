import axios from "axios";
import React, { useEffect, useState } from "react";
import style from './main.module.scss'

export const Main = () => {
  const [data, setData] = useState({ isLoader: true, data: {} });

  useEffect(() => {
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((res) => setData({ isLoader: false, data: res.data.students }))
      .catch(function (error) {
        console.log(error);
      });
      console.log(data)
  }, []);

  return (
    <>
      {data.isLoader && <div>LOADING</div>}
      {!data.isLoader &&
        data.data.map((item) => (
          <div className={style.main}>
            <div>{item.compay}</div>
            <div>{item.city}</div>
            <div>{item.email}</div>
            <div>{item.firstName}</div>
            <div>{item.lastName}</div>
            <img alt="avatar" src={item.pic} width="50" height="60"></img>
          </div>
        ))}
    </>
  );
};
