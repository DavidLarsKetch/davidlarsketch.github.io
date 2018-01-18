"use strict";

const $ = require("jquery");

let contactsData = [];

const makeContacts = data => {
  contactsData = data;

  const mainElm = document.createElement("main");
  const contactTitleElm = document.createElement("h1");
  contactTitleElm.append("Contact");

  const contactHolder = document.createElement("section");
  contactHolder.id = "contactHolder";
  contactHolder.className = "contact";

  contactsData.forEach(entry => contactHolder.append(makeContactItem(entry)));

  mainElm.append(contactTitleElm);
  mainElm.append(contactHolder);

  return mainElm;
};

const makeContactItem = obj => {
  const contactDivElm = document.createElement("div");
  contactDivElm.className = `contact-item ${obj.title.toLowerCase()}`;

  const contactLinkElm = document.createElement("a");
  contactLinkElm.className = "contact-link";
  contactLinkElm.href = obj.address;
  contactLinkElm.target = "_blank";

  const contactSVGWrapper = document.createElement("div");
  contactSVGWrapper.className = "contact-svg";
  if (obj.name === "telegram") contactSVGWrapper.className += " telegram";

  const contactTitle = document.createElement("h3");
  contactTitle.className="contact-title";
  contactTitle.append(obj.title);

  let svgElms = $.parseHTML(obj.svg);

  contactDivElm.append(contactLinkElm);
  contactLinkElm.append(contactSVGWrapper);
  svgElms.forEach(elm => contactSVGWrapper.append(elm));
  contactLinkElm.append(contactTitle);

  return contactDivElm;
};

module.exports = makeContacts;
