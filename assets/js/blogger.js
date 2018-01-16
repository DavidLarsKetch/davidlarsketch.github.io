"use strict";

const $ = require('jquery');
const storage = require("./storage");
const ajax = require("./ajax");

const $blogContainer = $("#blogContainer");
let blogData;

const makeBlog = data => {
  const mainElm = document.createElement("main");
  const blogTitleElm = document.createElement("h1");
  blogTitleElm.append("Blog");

  const blogHolder = document.createElement("div");
  blogHolder.id = "blogHolder";
  blogHolder.className = "blog";

  data.reverse().forEach(entry => blogHolder.append(makeBlogCard(entry)));

  mainElm.append(blogTitleElm);
  mainElm.append(blogHolder);

  return mainElm;
};

const makeBlogCard = obj => {
  const entryCardElm = document.createElement("div");
  entryCardElm.className = "blog-item";

  const entryTitleElm = document.createElement("div");
  entryTitleElm.append(obj.title);
  entryTitleElm.className = "blog-title";

  const entryDateElm = document.createElement("div");
  entryDateElm.append(obj.date);
  entryDateElm.className = "blog-date";

  const entryContentElm = document.createElement("span");
  let content = $.parseHTML(obj.content);
  content.forEach(elm => entryContentElm.append(elm));
  entryContentElm.className = "blog-text";

  entryCardElm.append(entryTitleElm);
  entryCardElm.append(entryDateElm);
  entryCardElm.append(entryContentElm);

  return entryCardElm;
};

const blogger = () => {
  // First prints from localStorage; then reprints from AJAX call
  // Next step is to compare the two data sets for differences & only print
  // those differences. Currently, if user is reading blog post then they lose
  // their place.
  blogData = storage.retrieve("blogData");
  if (blogData) {
    $blogContainer.append(makeBlog(blogData));
  }

  ajax.getBlog()
  .then(data => {
    blogData = ajax.fbDataProcessor(data);
    storage.save("blogData", blogData);
    $blogContainer.empty();
    $blogContainer.append(makeBlog(blogData));
  })
  .catch(err => console.log(err));
};

module.exports = blogger;
