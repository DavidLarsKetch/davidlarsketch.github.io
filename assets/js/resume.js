"use strict";

const $ = require('jquery');
const xhr = require('./xhr');
const storage = require('./storage');

let resumeData;

const makeResume = data => {
};

module.exports.resume = () => {
  xhr.getResume()
  .then(data => {
    resumeData = xhr.fbDataProcessor(data);
    $("#resumeContainer").append(makeResume(resumeData));
  })
  .catch(err => console.log(err));
};
