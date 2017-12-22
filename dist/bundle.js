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
      blogData = JSON.parse(loader.responseText);
      blogContainer.appendChild(makeBlog(blogData.entries));
      storage.save("blogData", blogData);
    });
    loader.open("GET", "./assets/json/blog.json");
    loader.send();
  } else {
    blogContainer.appendChild(makeBlog(blogData.entries));
  }

};

module.exports = blogger;

},{"./storage":7}],2:[function(require,module,exports){
"use strict";

},{}],3:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],4:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],5:[function(require,module,exports){
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

},{"./blogger":1,"./contact":2,"./footer":3,"./header":4,"./projects":6}],6:[function(require,module,exports){
"use strict";

const storage = require("./storage");

let projectsData = {};
const projectsContainer = document.getElementById("projectsContainer");

const makeProjects = data => {
  const mainElm = document.createElement("main");
  const projectsTitleElm = document.createElement("h1");
  const projectsTitleNode = document.createTextNode("Projects");
  const projectsWrapper = document.createElement("div");
  const projectsCollabWrapper = document.createElement("span");
  const projectsCollabTitleElm = document.createElement("h3");
  const projectsCollabTitleNode = document.createTextNode("Collaborative");
  const projectsSoloWrapper = document.createElement("span");
  const projectsSoloTitleElm = document.createElement("h3");
  const projectsSoloTitleNode = document.createTextNode("Solo");

  projectsWrapper.id = "projectsWrapper";
  projectsWrapper.className = "projects-wrapper";
  projectsCollabWrapper.id = "projectsCollab";
  projectsCollabWrapper.className = "projects-column projects-collab";
  projectsSoloWrapper.id = "projectsSolo";
  projectsSoloWrapper.className = "projects-column projects-solo";

  mainElm.appendChild(projectsTitleElm);
  projectsTitleElm.appendChild(projectsTitleNode);
  projectsWrapper.appendChild(projectsCollabWrapper);
  projectsWrapper.appendChild(projectsSoloWrapper);
  projectsCollabWrapper.appendChild(projectsCollabTitleElm);
  projectsCollabTitleElm.appendChild(projectsCollabTitleNode);
  projectsSoloWrapper.appendChild(projectsSoloTitleElm);
  projectsSoloTitleElm.appendChild(projectsSoloTitleNode);
  mainElm.appendChild(projectsWrapper);

  data.forEach(project => {
    if (project.category === "collab") {
      projectsCollabWrapper.appendChild(makeProjectCard(project));
    } else if (project.category === "solo") {
      projectsSoloWrapper.appendChild(makeProjectCard(project));
    }
  });


  return mainElm;
};

const makeProjectCard = obj => {
  const projectCardElm = document.createElement("section");


  const projectLinkElm = document.createElement("a");
  const projectContentElm = document.createElement("img");

  const projectTitleElm = document.createElement("span");
  const projectTitleNode = document.createTextNode(obj.title);

  projectCardElm.className = "project-item";
  projectLinkElm.href = obj.link;
  projectLinkElm.target = "_blank";
  projectContentElm.src = obj.img;
  projectContentElm.className = `project-img ${obj.category}`;
  projectTitleElm.className = "project-title";

  projectCardElm.appendChild(projectLinkElm);
  projectCardElm.appendChild(projectTitleElm);
  projectLinkElm.appendChild(projectContentElm);
  projectTitleElm.appendChild(projectTitleNode);

  return projectCardElm;
};

const projectMaker = () => {
  projectsData = storage.retrieve("projectsData");
  if (!projectsData) {
    const loader = new XMLHttpRequest();

    loader.addEventListener("load", () => {
      projectsData = JSON.parse(loader.responseText);
      projectsContainer.appendChild(makeProjects(projectsData.projects));
      storage.save("projectsData", projectsData);

    });
    loader.open("GET", "./assets/json/projects.json");
    loader.send();
  } else {
    projectsContainer.appendChild(makeProjects(projectsData.projects));
  }
};

module.exports = projectMaker;

},{"./storage":7}],7:[function(require,module,exports){
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

},{}]},{},[5]);
