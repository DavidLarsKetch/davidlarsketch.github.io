"use strict";

const footer = require("./footer");
footer();
const header = require("./header");
header();

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
