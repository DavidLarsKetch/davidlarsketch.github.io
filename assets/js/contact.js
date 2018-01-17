"use strict";

const $ = require("jquery");
const ajax = require("./ajax");
const storage = require('./storage');

const $contactsContainer = $('#contactsContainer');
let contactsData = [];

const makeContacts = data => {
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

  const mainElm = document.createElement("main");
  const contactTitleElm = document.createElement("h1");
  contactTitleElm.append("Contact");

  const contactHolder = document.createElement("section");
  contactHolder.id = "contactHolder";
  contactHolder.className = "contact";

  data.forEach(entry => contactHolder.append(makeContactItem(entry)));

  mainElm.append(contactTitleElm);
  mainElm.append(contactHolder);

  return mainElm;
};

const makeContactItem = obj => {
  const contactDivElm = document.createElement("div");
  contactDivElm.className = `contact-item ${obj.title.toLowerCase()}`;

  const contactLinkElm = document.createElement("a");
  contactLinkElm.href = obj.address;
  contactLinkElm.target = "_blank";

  const contactTitle = document.createElement("h3");
  contactTitle.append(obj.title);

  contactDivElm.append(contactLinkElm);
  contactLinkElm.append(contactTitle);

  return contactDivElm;
};

const contacter = () => {
  contactsData = storage.retrieve("contactsData");
  if (contactsData) {
    $contactsContainer.append(makeContacts(contactsData));
  }

  ajax.getContacts()
  .then(data => {
    contactsData = ajax.fbDataProcessor(data);
    storage.save("contactsData", contactsData);
    $contactsContainer.empty().append(makeContacts(contactsData));
  })
  .catch(err => console.log(err));
};

module.exports = contacter;
