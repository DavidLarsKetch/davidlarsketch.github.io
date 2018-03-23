"use strict";

const { getData } = require("./model");
const { retrieve, save } = require("./utils/storage");
const { printToAllPages, printThisPage } = require("./view");

let currentPage = document.title.toLowerCase();

const loadPage = () => {
  printToAllPages();

  let localStorageData = retrieve(`${currentPage}Data`);
  if (localStorageData) printThisPage(currentPage, localStorageData);

  getData(currentPage)
  .then(data => {
    printThisPage(currentPage, data);
    save(`${currentPage}Data`, data);
  })
  .catch(err => console.log(err));
};

module.exports = {loadPage};
