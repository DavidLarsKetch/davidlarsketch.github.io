"use strict";

const $ = require('jquery');
const footer = require("./templates/footer");
const header = require("./templates/header");

const pages = {
  about: require("./templates/about"),
  contact: require("./templates/contact"),
  projects: require("./templates/projects")
};

const printToAllPages = () => {
  header();
  footer();
};

const printThisPage = (page, data) => {
  let $thisContainer = $(`#${page}Container`);
  $thisContainer.empty();
  $thisContainer.append(pages[page](data));
};

module.exports = {printThisPage, printToAllPages};
