"use strict";

const $ = require('jquery');

let resumeData;

const makeResume = data => {
  resumeData = data;

  const mainElm = document.createElement("main");
  mainElm.className = "resume-content";
  const resumeTitle = document.createElement("h1");
  resumeTitle.append("Resume");

  const educationElm = document.createElement("section");
  educationElm.id = "education";
  educationElm.className = "education";
  const educationHeading = document.createElement("h2");
  educationHeading.className = "section-heading";
  educationHeading.append("Education");
  educationElm.append(educationHeading);

  const workElm = document.createElement("section");
  workElm.id = "workExperience";
  workElm.className = "work-experience";
  const workHeading = document.createElement("h2");
  workHeading.className = "section-heading";
  workHeading.append("Work Experience");
  workElm.append(workHeading);

  resumeData.forEach(obj => {
    let content = $.parseHTML(obj.content);
    let articleElm = document.createElement("article");
    articleElm.className = "resume-item";

    content.forEach(elm => articleElm.append(elm));

    if (obj.class === "education") {
      educationElm.append(articleElm);
    } else if (obj.class === "work") {
      workElm.append(articleElm);
    }
  });

  mainElm.append(resumeTitle);
  mainElm.append(educationElm);
  mainElm.append(workElm);

  return mainElm;
};

module.exports = makeResume;
