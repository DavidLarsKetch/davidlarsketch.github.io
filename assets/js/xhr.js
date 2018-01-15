"use strict";

const $ = require('jquery');
const fbURL = "https://davidlarsketch-8da73.firebaseio.com";

module.exports.fbDataProcessor = data => {
  let dataToSend = [];
  let keys = Object.keys(data);
  keys.forEach(key => {
    data[key].id = key;
    dataToSend.push(data[key]);
  });
  return dataToSend;
};

module.exports.getBlog = () => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/blog/entries.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getContacts = () => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/contacts/items.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};

module.exports.getResume = () => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/resume/item.json`
    })
    .done(data => resolve(data))
    .fail(err => reject(err));
  });
};
