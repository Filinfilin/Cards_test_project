import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import _ from "lodash";

export const CardsContext = createContext();

export const CardsContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchedString, setSearchedString] = useState("");
  const [showShowSearchResults, setShowSearchResults] = useState(false);

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
  }, []);

  const findByName = (inputValue) => {
    // This function search for matches in first/last
    // name and store it till the input value changed
    // only if input isnt empty
    inputValue = inputValue.trim().toLowerCase().replace(/\s+/g, "");
    let studentsToShow = [];
    if (inputValue) {
      setShowSearchResults(true);
      for (let studentIndex in data) {
        if (
          `${data[studentIndex].firstName.toLowerCase()}+${data[
            studentIndex
          ].lastName.toLowerCase()}`.includes(inputValue)
        ) {
          studentsToShow.push(data[studentIndex]);
        }
      }
      let result = _.uniqBy(studentsToShow, "id");
      return result;
    } else {
      setShowSearchResults(false);
    }
  };

  const filteredByName = useMemo(
    () => findByName(searchedString),
    [searchedString]
  );

  return (
    <CardsContext.Provider
      value={{
        cardsToShow: showShowSearchResults ? filteredByName : data,
        setSearchedString,
        searchedString,
        showShowSearchResults,
        setShowSearchResults,
        loader,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};
