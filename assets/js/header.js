"use strict";

const pages = ["Resume", "Projects", "Blog", "Contact"];

const header = () => {
  const here = document.getElementById("header");
  const nav = document.createElement("nav");

  const titleElm = document.createElement("span");
  const titleLink = document.createElement("a");
  titleLink.className = "header title";
  titleLink.href = document.title === "David Lars Ketch" ? "#top" : "index.html";
  const titleText = document.createTextNode("DLK");

  const navLinks = document.createElement("span");
  pages.forEach(page => navLinks.appendChild(makePageNav(page)));

  here.appendChild(nav);
  nav.appendChild(titleElm);
  titleElm.appendChild(titleLink);
  titleLink.appendChild(titleText);
  nav.appendChild(navLinks);
};

const makePageNav = item => {
  let spanElm = document.createElement("span");
  let linkElm = document.createElement("a");
  let textNode;

  spanElm.className = "nav-links";
  linkElm.href = document.title === item ? "#top" : `${item.toLowerCase()}.html`;
  textNode = document.createTextNode(item);

  linkElm.appendChild(textNode);
  spanElm.appendChild(linkElm);

  return spanElm;
};

module.exports = header;
