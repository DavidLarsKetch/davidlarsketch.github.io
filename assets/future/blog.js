"use strict";

const $ = require('jquery');

let blogData;

const makeBlog = data => {
  blogData = data;

  const mainElm = document.createElement("main");
  const blogTitleElm = document.createElement("h1");
  blogTitleElm.append("Blog");

  const blogHolder = document.createElement("div");
  blogHolder.id = "blogHolder";
  blogHolder.className = "blog";

  blogData.reverse().forEach(entry => blogHolder.append(makeBlogCard(entry)));

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

module.exports = makeBlog;
