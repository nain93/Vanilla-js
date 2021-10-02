import "./index.css";
import { handlePushHistory, initialRoutes } from "../router";
import { searchApi } from "../api";
import ROUTE_PATH from "./constants/routePath";

const historyLink = document.querySelectorAll(".history");
const nav = document.querySelector(".nav-box");
const profileDiv = document.querySelector(".profile-list");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

initialRoutes(profileDiv);
const { API, LOCAL } = ROUTE_PATH;
let starItemArr = [];

const handleSearch = () => {
  searchForm.addEventListener("submit", (e) => {
    const location = window.location.pathname;
    e.preventDefault();
    console.log(location);
    if (location === API) {
      getProfileApi(searchInput.value);
    } else if (location === LOCAL) {
      handleShowBookMarkList(searchInput.value);
    }
    searchInput.value = "";
  });
};

const handleSort = (a, b) => {
  if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
  if (b.login.toLowerCase() < a.login.toLowerCase()) return 1;
  return 0;
};

const getProfileApi = async (searchText) => {
  let result = [];
  try {
    const res = await searchApi.search(searchText);
    result = res.data.items.sort(handleSort);

    handleShowSearchList(result);
  } catch (e) {
    console.log(e);
  }
};

// * 받아온 데이터를 화면에 뿌려주는 함수
const handleShowSearchList = (result) => {
  profileDiv.textContent = "";
  result.forEach((item) => {
    const li = document.createElement("li");
    const profileImg = document.createElement("img");
    const span = document.createElement("span");
    const starImg = document.createElement("i");
    li.className = "search-list";
    profileDiv.appendChild(li);
    starImg.className = "far fa-star fa-2x";
    profileImg.className = "profile-img";
    profileImg.src = item.avatar_url;
    li.append(profileImg, span, starImg);

    span.textContent = item.login;
  });
};

const handleShowBookMarkList = (text) => {
  profileDiv.textContent = "";
  const searchedArr = starItemArr.filter((item) => item.name.includes(text));
  console.log(searchedArr, "searchedArr");
  searchedArr.forEach((item) => {
    const li = document.createElement("li");
    const profileImg = document.createElement("img");
    const span = document.createElement("span");
    const starImg = document.createElement("i");
    li.className = "search-list";
    profileDiv.appendChild(li);
    li.append(profileImg, span, starImg);
    starImg.className = "far fa-star fa-2x";
    profileImg.className = "profile-img";
    profileImg.src = item.src;
    span.textContent = item.name;
  });
};

const handleRouteClick = (e) => {
  const target = e.target;
  const buttonContainerArray = nav.children;
  for (let i = 0; i < buttonContainerArray.length; i++) {
    const childrenArray = buttonContainerArray[i];
    childrenArray.classList.remove("history_onClick");
  }
  target.classList.add("history_onClick");
  const pathName = e.target.getAttribute("route");
  handlePushHistory(pathName, profileDiv);
};

function saveState() {
  localStorage.setItem("bookmark", JSON.stringify(starItemArr));
}

function loadState() {
  starItemArr = JSON.parse(localStorage.getItem("bookmark")) || [];
}

const bookMarkObj = (src, name) => {
  return {
    id: String(Date.now()),
    src,
    name,
  };
};

const handleProfileClick = (e) => {
  const target = e.target;
  const obj = bookMarkObj(
    target.children[0].getAttribute("src"),
    target.children[1].textContent
  );
  if (target.children[2]?.getAttribute("data-prefix") === "far") {
    starItemArr.push(obj);
    target.children[2]?.setAttribute("data-prefix", "fas");
  } else {
    starItemArr = starItemArr.filter((item) => {
      return item.src !== target.children[0].getAttribute("src");
    });
    target.children[2]?.setAttribute("data-prefix", "far");
  }

  saveState();
};

const init = async () => {
  historyLink[0].classList.add("history_onClick");
  nav.addEventListener("click", handleRouteClick);
  profileDiv.addEventListener("click", handleProfileClick);

  handleSearch();
  loadState();
};
init();
