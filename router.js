const { default: ROUTE_PATH } = require("./src/constants/routePath");
const apiTemplate = require("./src/pages/api.hbs");
const localTemplate = require("./src/pages/local.hbs");

const Api = apiTemplate();
const Local = localTemplate();

const { API, LOCAL } = ROUTE_PATH;

let routes = {};

routes[API] = Api;
routes[LOCAL] = Local;

const initialRoutes = (element) => {
  renderHTML(element, routes[API]);

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
