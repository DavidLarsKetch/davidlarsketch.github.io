"use strict";

const footer = () => {
  const here = document.getElementById("footer");
  const divElm = document.createElement("div");
  divElm.className = "footer title";
  const footerText = document.createTextNode("\u00a9 2017 \u00a0-\u00a0 DLK");
  here.appendChild(divElm);
  divElm.appendChild(footerText);
};

module.exports = footer;
