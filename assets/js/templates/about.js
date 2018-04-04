"use strict";

const $ = require('jquery');
const md = require('markdown').markdown;

let indexData;

const makeIndex = ({0: {about} }) => {
  indexData = about;

  const mainElm = document.createElement("main");
  mainElm.className = "about";

  const aboutElm = document.createElement("section");
  aboutElm.className = "about__wrapper";
  aboutElm.innerHTML = md.toHTML(indexData);

  mainElm.append(aboutElm);

  return mainElm;
};

module.exports = makeIndex;
