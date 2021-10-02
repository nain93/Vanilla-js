import "./index.css";
import { handlePushHistory, initialRoutes } from "./router";
import { searchApi } from "./api";

const historyLink = document.querySelectorAll(".history");
const profileDiv = document.querySelector(".profile-list");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-input");

initialRoutes(profileDiv);

const handleSearch = () => {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getUsersByAPI(searchInput.value);
    searchInput.value = "";
  });
};

const getUsersByAPI = async (searchText) => {
  let result = [];
  try {
    const res = await searchApi.search(searchText);
    result = res.data.items;
    handleShowList(result);
    console.log(result, "data");
  } catch (e) {
    console.log(e);
  }
};

// * 받아온 데이터를 화면에 뿌려주는 함수
const handleShowList = (result) => {
  profileDiv.textContent = "";
  result.forEach((item) => {
    const li = document.createElement("li");
    const profileImg = document.createElement("img");
    const span = document.createElement("span");
    const searchBtn = document.createElement("button");
    li.className = "search-list";
    profileDiv.appendChild(li);
    profileImg.className = "profile-img";
    profileImg.src = item.avatar_url;

    li.append(profileImg, span, searchBtn);

    span.textContent = item.login;
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
