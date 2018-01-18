"use strict";

const $ = require('jquery');
const fbURL = "https://davidlarsketch-8da73.firebaseio.com";

const fbDataProcessor = data => {
  let dataToSend = [];
  let keys = Object.keys(data);
  keys.forEach(key => {
    data[key].id = key;
    dataToSend.push(data[key]);
  });
  return dataToSend;
};

module.exports.getData = page => {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `${fbURL}/${page}.json`
    })
    .done(data => {
      data = fbDataProcessor(data);
      resolve(data);
    })
    .fail(err => reject(err));
  });
};
