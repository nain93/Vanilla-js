import "./index.css";
import { handlePushHistory, initialRoutes } from "./router";

const historyLink = document.querySelectorAll(".history");
const profileDiv = document.querySelector(".profile-list");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

initialRoutes(profileDiv);

const searchObjFn = (text) => {
  return {
    id: String(Date.now()),
    text,
  };
};

const handleSearch = () => {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listObj = searchObjFn(searchInput.value);
    searchInput.value = "";
    console.log(listObj);
  });
};

const init = async () => {
  historyLink.forEach((element) => {
    element.addEventListener("click", (e) => {
      const pathName = e.target.getAttribute("route");
      handlePushHistory(pathName, profileDiv);
    });
  });
  handleSearch();
};
init();
