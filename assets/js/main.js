"use strict";

const footer = require("./footer");
const header = require("./header");


const pages = {
  blog: require("./blogger"),
  contact: require("./contact"),
  projects: require("./projects")
};

const page = document.title.toLowerCase();
const re = new RegExp(page);

for (let key in pages) {
  let result = re.test(key);
  if (result) {
    pages[key]();
  }
}
