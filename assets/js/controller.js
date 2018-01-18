"use strict";

const model = require("./model");
const storage = require("./utils/storage");
const view = require("./view");

let currentPage = document.title.toLowerCase();

const loadPage = () => {
  view.printToAllPages();

  let localStorageData = storage.retrieve(`${currentPage}Data`);
  if(localStorageData) view.printThisPage(currentPage, localStorageData);

  model.getData(currentPage)
  .then(data => {
    view.printThisPage(currentPage, data);
    storage.save(`${currentPage}Data`, data);
  })
  .catch(err => console.log(err));
};

module.exports = {loadPage};
