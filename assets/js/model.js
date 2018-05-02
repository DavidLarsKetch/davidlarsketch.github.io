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

const getTechData = data =>
new Promise((resolve, reject) =>
$.ajax({ url: `${fbURL}/tech.json` })
.done(techData => {
  console.log(techData);
  techData = fbDataProcessor(techData);
  data = data.map(project => {
    project.tech = project.tech.map(item => {
      return techData.find(element => element.name === item);
    });
    return project;
  });
  console.log(data);
  resolve(data);
})
);

module.exports.getData = page =>
  new Promise((resolve, reject) =>
    $.ajax({ url: `${fbURL}/${page}.json` })
    .done(data => {
      data = fbDataProcessor(data);
      if (page === "projects") {
        return getTechData(data)
          .then(data => resolve(data));
      }
      resolve(data);
    })
    .fail(err => reject(err))
  );
