import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

export const CardsContext = createContext();

export const CardsContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [search, setSearch] = useState({
    tag: "",
    name: "",
  });
  const [tags, setTags] = useState([]);
  const [showShowSearchResults, setShowSearchResults] = useState(false);
  const [expandGradeId, setExpandGradeId] = useState();
  const [searchResult, setSearchResult] = useState();
  const [newTag, setNewTag] = useState({ studentId: null, newTag: "" });

  useEffect(() => {
    setSpinner(true);
    axios
      .get("https://api.hatchways.io/assessment/students")
      .then((res) => {
        addToAllStudentsTagField(res.data.students);
      })
      .catch(function (error) {
        setSpinner(false);
        console.log(error);
      });
  }, []);

  const addToAllStudentsTagField = (data) => {
    // adding to every students tags array
    // in order to use it in a future
    let result = [];
    let dataToModify = data;
    for (let student in data) {
      dataToModify[student].tags = [];
      result.push(data[student]);
    }
    setData(result);
    setSpinner(false);
  };

  const addTag = ({ studentId, tag }) => {
    // the best chice to make here POST request to send data to DB
    // another option we can use indexedDB if we will use PWA version of app
    if (tag !== "") {
      let newData = data;
      let actualStudentTags = [];
      for (let student in newData) {
        if (newData[student].id == studentId) {
          let len = newData[student].tags.length + 1;
          newData[student].tags.push({ tag: tag, id: len });
          actualStudentTags = newData[student].tags;
        }
      }
      setData(newData);
      return actualStudentTags;
    }
  };

  const nameCondition = (student, name) => {
    return `${student.firstName.toLowerCase()}+${student.lastName.toLowerCase()}`.includes(
      name
    );
  };

  const tagCondition = (allTags = "", tag = "") => {
    let result;
    for (let item in allTags) {
      if(allTags[item].tag.toLowerCase().replace(/\s+/g, "").includes(tag)){
        result=true
      }
    }
    return result
  };

  const findOne = ({ tag, name }) => {
    // This function search for matches in first/last
    // and matches in tags names
    // only if input isnt empty
    name = name.trim().toLowerCase().replace(/\s+/g, "");
    tag = tag.trim().toLowerCase().replace(/\s+/g, "");
    let studentsToShow = [];
    let tagResult = false;
    let nameResult = false;
    if (name || tag) {
      setShowSearchResults(true);
      for (let studentIndex in data) {
        if (name !== "") {
          nameResult = nameCondition(data[studentIndex], name);
        }
        if (data[studentIndex].tags.length !== 0 && tag) {
          tagResult = tagCondition(data[studentIndex].tags, tag);
        }
        if (nameResult || tagResult) {
          studentsToShow.push(data[studentIndex]);
          tagResult = false;
          nameResult = false;
        }
      }
      let result = _.uniqBy(studentsToShow, "id");
      setSearchResult(result);
      return;
    } else {
      setShowSearchResults(false);
    }
  };


  useEffect(() => {
    setSpinner(true, findOne(search));
  }, [search]);

  return (
    <CardsContext.Provider
      value={{
        cardsToShow: showShowSearchResults ? searchResult : data,
        setSearch,
        search,
        showShowSearchResults,
        setShowSearchResults,
        expandGradeId,
        setExpandGradeId,
        newTag,
        setNewTag,
        tags,
        addTag,
        setTags,
        spinner,
        setSpinner,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};
