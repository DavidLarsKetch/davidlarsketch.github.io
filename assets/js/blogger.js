"use strict";

const $ = require('jquery');
const storage = require("./storage");
const xhr = require("./xhr");

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
  //Commented out code - remove comments to enable drawing from localStorage &
  //not being able to update.
  //Needs function for comparing localStorage & JSON data.
//  blogData = storage.retrieve("blogData");
//  if (!blogData) {
    xhr.getBlog()
    .then(data => {
      blogData = xhr.fbDataProcessor(data);
      $("#blogContainer").append(makeBlog(blogData));
    })
    .catch(err => console.log(err));
//  } else {
//    blogContainer.appendChild(makeBlog(blogData.entries));
//  }

};

module.exports = blogger;
