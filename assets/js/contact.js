"use strict";

const storage = require('./storage');

let contactData = {};
const contactContainer = document.getElementById("contactContainer");

const makeContacts = data => {
  const structure = data.structure;
  // Experimental  -  loop through JSON data.structure to make the DOM elements
  // instead of hard-coding each. This could be applied to each page of the site

  // const test = (obj) => {
  //   for (let prop in obj) {
  //     console.log(obj[prop]);
  //     for (let key in obj[prop]) {
  //       console.log(obj[prop][key]);
  //     }
  //   }
  // };
  // test(structure);
  const mainElm = document.createElement(structure.toContainer.elm);
  const contactTitleElm = document.createElement(structure.pageTitle.elm);
  const contactTitleNode = document.createTextNode(structure.pageTitle.content);
  const contactHolder = document.createElement(structure.holder.elm);

  contactHolder.id = structure.holder.id;
  contactHolder.className = structure.holder.className;
  data.items.forEach(entry => contactHolder.appendChild(makeContactItem(entry)));

  mainElm.appendChild(contactTitleElm);
  contactTitleElm.appendChild(contactTitleNode);
  mainElm.appendChild(contactHolder);

  return mainElm;
};

const makeContactItem = obj => {
  const contactDivElm = document.createElement("div");
  contactDivElm.className = `contact-item ${obj.title.toLowerCase()}`;

  const contactLinkElm = document.createElement("a");
  contactLinkElm.href = obj.address;
  contactLinkElm.target = "_blank";

  const contactTitle = document.createElement("h3");
  const contactTitleNode = document.createTextNode(obj.title);

  contactDivElm.appendChild(contactLinkElm);
  contactLinkElm.appendChild(contactTitle);
  contactTitle.appendChild(contactTitleNode);

  return contactDivElm;
};

const contacter = () => {
  const loader = new XMLHttpRequest();

  loader.addEventListener("load", function() {
    contactData = JSON.parse(loader.responseText);
    contactContainer.appendChild(makeContacts(contactData.contacts));
    storage.save("contactData", contactData);
  });
  loader.open("GET", "./assets/json/contacts.json");
  loader.send();
};

module.exports = contacter;
