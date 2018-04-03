"use strict";

const $ = require("jquery");

let contactsData = [];

const makeContacts = data => {
  contactsData = data;

  const mainElm = document.createElement("main");
  mainElm.className = "contact";

  const contactTitleElm = document.createElement("h1");
  contactTitleElm.append("Contact");

  const contactHolder = document.createElement("section");
  contactHolder.id = "contactHolder";
  contactHolder.className = "contact__container";

  contactsData.forEach(entry => contactHolder.append(makeContactItem(entry)));

  mainElm.append(contactTitleElm);
  mainElm.append(contactHolder);

  return mainElm;
};

const makeContactItem = obj => {
  const contactDivElm = document.createElement("div");
  contactDivElm.className = `contact__item ${obj.title.toLowerCase()}`;

  const contactLinkElm = document.createElement("a");
  contactLinkElm.className = "contact__link";
  contactLinkElm.href = obj.address;
  contactLinkElm.target = "_blank";

  const contactSVGWrapper = document.createElement("div");
  contactSVGWrapper.className = "contact__svg";
  if (obj.name === "telegram") contactSVGWrapper.className += " contact__telegram";

  const contactTitle = document.createElement("span");
  contactTitle.className="contact__title";
  contactTitle.append(obj.title);

  let svgElms = $.parseHTML(obj.svg);

  contactDivElm.append(contactLinkElm);
  contactLinkElm.append(contactSVGWrapper);
  svgElms.forEach(elm => contactSVGWrapper.append(elm));
  contactLinkElm.append(contactTitle);

  return contactDivElm;
};

module.exports = makeContacts;
