import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CardContext = createContext();

export const CardContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((res) => {
        setData(res.data.students);
        setLoader(false);
      })
      .catch(function (error) {
        setLoader(false);
        console.log(error);
      });
      console.log(data)
  }, []);

  return (
    <CardContext.Provider
      value={{
        data,
        loader
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
