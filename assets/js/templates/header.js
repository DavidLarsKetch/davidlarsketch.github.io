"use strict";

const $ = require("jquery");
const pages = ["Projects", "Contact"];

const header = () => {
  const nav = document.createElement("nav");
  nav.className = "header__nav";

  const titleElm = document.createElement("span");
  titleElm.className = "header__title";

  const titleLink = document.createElement("a");
  titleLink.href = document.title === "David Lars Ketch" ? "#top" : "index.html";
  titleLink.append("DLK");

  const navLinks = document.createElement("span");
  navLinks.className = "header__nav-links";
  pages.forEach(page => navLinks.append(makePageNav(page)));

  $("#header").append(nav);
  nav.append(titleElm);
  titleElm.append(titleLink);
  nav.append(navLinks);
};

const makePageNav = item => {
  let spanElm = document.createElement("span");
  let linkElm = document.createElement("a");

  // spanElm.className = "header__nav-links";
  linkElm.href = document.title === item ? "#top" : `${item.toLowerCase()}.html`;

  linkElm.append(item);
  spanElm.append(linkElm);

  return spanElm;
};

module.exports = header;
