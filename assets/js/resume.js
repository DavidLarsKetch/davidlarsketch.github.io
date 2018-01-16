"use strict";

const $ = require('jquery');
const ajax = require('./ajax');
const storage = require('./storage');

const $resumeContainer = $("#resumeContainer");
let resumeData;

const makeResume = data => {
  const mainElm = document.createElement("main");
  mainElm.className = "resume-content";
  const resumeTitle = document.createElement("h1");
  resumeTitle.append("Resume");

  const educationElm = document.createElement("section");
  educationElm.id = "education";
  educationElm.className = "education";
  //Filter data to get those items with class of education, append to educationElm

  const workElm = document.createElement("section");
  workElm.id = "workExperience";
  workElm.className = "work-experience";
  //Filter data to get those items with class of work, append to workExperience

  mainElm.append(resumeTitle);
  mainElm.append(educationElm);
  mainElm.append(workElm);

  return mainElm;

};

const resume = () => {
  resumeData = storage.retrieve("resumeData");
  if (resumeData) {
    $resumeContainer.append(makeResume(resumeData));
  }

  ajax.getResume()
  .then(data => {
    resumeData = ajax.fbDataProcessor(data);
    storage.save("resumeData", resumeData);
    $resumeContainer.empty();
    $resumeContainer.append(makeResume(resumeData));
  })
  .catch(err => console.log(err));
};

module.exports = resume;
