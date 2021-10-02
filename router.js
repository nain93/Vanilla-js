const apiTemplate = require("./pages/api.hbs");
const localTemplate = require("./pages/local.hbs");

const Api = apiTemplate();
const Local = localTemplate();

const routes = {
  "/api": Api,
  "/local": Local,
};

const initialRoutes = (element) => {
  renderHTML(element, routes["/api"]);

  window.onpopstate = () =>
    renderHTML(element, routes[window.location.pathname]);
};

const handlePushHistory = (pathName, element) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(element, routes[pathName]);
};

// render
const renderHTML = (element, route) => {
  element.innerHTML = route;
};

module.exports = {
  initialRoutes,
  handlePushHistory,
};
