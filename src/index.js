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

// * 검색어를 받아오는 함수
const handleSearch = (e) => {
  const location = window.location.pathname;
  e.preventDefault();
  if (!searchInput.value) {
    profileDiv.textContent = "검색어를 입력해주세요";
    return;
  }
  if (location === API) {
    getProfileApi(searchInput.value);
  } else if (location === LOCAL) {
    handleShowBookMarkList(searchInput.value);
  }
  searchInput.value = "";
};

// * 정렬 함수
const handleSort = (a, b) => {
  if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
  if (b.login.toLowerCase() < a.login.toLowerCase()) return 1;
  return 0;
};

// * api 받아오는 함수
const getProfileApi = async (searchText) => {
  let result = [];
  try {
    const res = await searchApi.search(searchText);
    if (res.data.items.length !== 0) {
      result = res.data.items.sort(handleSort);
      handleShowSearchList(result);
    } else {
      profileDiv.textContent = "검색 결과가 없습니다";
    }
  } catch (e) {
    console.log(e);
  }
};

// * 받아온 데이터를 화면에 보여주는 함수(api)
const handleShowSearchList = (result) => {
  profileDiv.textContent = "";
  result.forEach((item) => {
    const profileItem = document.createElement("li");
    const profileImg = document.createElement("img");
    const profileName = document.createElement("span");
    const starImg = document.createElement("i");
    profileItem.className = "profile-item";
    profileDiv.appendChild(profileItem);
    profileName.className = "profile-name";
    starImg.className = "far fa-star fa-2x";
    profileImg.className = "profile-img";
    profileImg.src = item.avatar_url;
    profileItem.append(profileImg, profileName, starImg);
    profileName.textContent = item.login;
    profileItem.addEventListener("click", () =>
      handleProfileClick(profileItem, profileImg, profileName)
    );
  });
};

// * 받아온 데이터를 화면에 보여주는 함수(로컬)
const handleShowBookMarkList = (text) => {
  profileDiv.textContent = "";
  const searchedArr = starItemArr.filter((item) => item.name.includes(text));
  searchedArr.forEach((item) => {
    const li = document.createElement("li");
    const profileImg = document.createElement("img");
    const span = document.createElement("span");
    const starImg = document.createElement("i");
    profileDiv.appendChild(li);
    li.append(profileImg, span, starImg);
    li.className = "profile-item";

    starImg.className = "far fa-star fa-2x";
    profileImg.className = "profile-img";
    profileImg.src = item.src;
    span.textContent = item.name;
  });
};

// * 라우팅 함수
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

// * 즐겨찾기 데이터 로컬에 저장
function saveState() {
  localStorage.setItem("bookmark", JSON.stringify(starItemArr));
}
// * 즐겨찾기 데이터 로컬에서 불러오기
function loadState() {
  starItemArr = JSON.parse(localStorage.getItem("bookmark")) || [];
}
// * 로컬에 저장할 데이터 형식
const bookMarkObj = (src, name, bookmark) => {
  return {
    id: String(Date.now()),
    src,
    name,
    bookmark,
  };
};
// * 프로필 클릭시 즐겨찾기 하는 함수
const handleProfileClick = (profileItem, profileImg, profileName) => {
  let obj = {};
  if (profileItem.children[2].getAttribute("data-prefix") === "far") {
    obj = bookMarkObj(
      profileImg.getAttribute("src"),
      profileName.textContent,
      true
    );
    starItemArr.push(obj);
    profileItem.children[2].setAttribute("data-prefix", "fas");
  } else {
    starItemArr = starItemArr.filter((item) => {
      return item.src !== profileImg.getAttribute("src");
    });
    obj = bookMarkObj(
      profileImg.getAttribute("src"),
      profileName.textContent,
      false
    );
    profileItem.children[2].setAttribute("data-prefix", "far");
  }

  saveState();
};
// * 시작함수
const init = () => {
  loadState();
  historyLink[0].classList.add("history_onClick");
  nav.addEventListener("click", handleRouteClick);
  searchForm.addEventListener("submit", handleSearch);
};
init();
