(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const storage = require("./storage");

let blogData = {};
const blogContainer = document.getElementById("blogContainer");

const makeBlog = data => {
  const mainElm = document.createElement("main");
  const blogTitleElm = document.createElement("h1");
  const blogTitleNode = document.createTextNode("Blog");
  const blogHolder = document.createElement("div");

  blogHolder.id = "blogHolder";
  blogHolder.className = "blog";
  data.forEach(entry => blogHolder.appendChild(makeBlogCard(entry)));

  mainElm.appendChild(blogTitleElm);
  blogTitleElm.appendChild(blogTitleNode);
  mainElm.appendChild(blogHolder);

  return mainElm;
};

const makeBlogCard = obj => {
  const entryCardElm = document.createElement("div");

  const entryTitleElm = document.createElement("h4");
  const entryTitleNode = document.createTextNode(obj.title);

  const entryDateElm = document.createElement("div");
  const entryDateNode = document.createTextNode(obj.date);

  const entryContentElm = document.createElement("span");
  const entryContentNode = document.createTextNode(obj.content);

  entryCardElm.className = "blog-item";
  entryTitleElm.className = "blog-title";
  entryDateElm.className = "blog-date";
  entryContentElm.className = "blog-text";

  entryCardElm.appendChild(entryTitleElm);
  entryTitleElm.appendChild(entryTitleNode);
  entryCardElm.appendChild(entryDateElm);
  entryDateElm.appendChild(entryDateNode);
  entryCardElm.appendChild(entryContentElm);
  entryContentElm.appendChild(entryContentNode);

  return entryCardElm;
};

const blogger = () => {
  blogData = storage.retrieve("blogData");
  if (!blogData) {
    const loader = new XMLHttpRequest();

    loader.addEventListener("load", function() {
      let blogData = JSON.parse(loader.responseText);
      blogContainer.appendChild(makeBlog(blogData.entries));
      storage.save("blogData", blogData);
    });
    loader.open("GET", "json/blog.json");
    loader.send();
  } else {
    blogContainer.appendChild(makeBlog(blogData.entries));
  }

};

module.exports = blogger;

},{"./storage":3}],2:[function(require,module,exports){
"use strict";

const blogger = require("./blogger");

blogger();

},{"./blogger":1}],3:[function(require,module,exports){
"use strict";

module.exports.retrieve = key => {
  let data = localStorage.getItem(key);
  data = JSON.parse(data);
  return data;
};

module.exports.save = (key, value) => {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

},{}]},{},[2]);
