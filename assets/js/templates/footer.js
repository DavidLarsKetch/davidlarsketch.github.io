"use strict";

const $ = require('jquery');

const footer = () => {
  const divElm = document.createElement("div");
  divElm.className = "footer title";
  divElm.append('\u00a9 2017 \u00a0-\u00a0 DLK');
  $("#footer").append(divElm);
};

module.exports = footer;
