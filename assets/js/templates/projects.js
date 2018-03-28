"use strict";

const $ = require("jquery");

let projectsData = {};

const makeProjects = data => {
  projectsData = data;

  const mainElm = document.createElement("main");
  mainElm.className = "projects";

  const projectsTitleElm = document.createElement("h1");
  mainElm.append(projectsTitleElm);
  projectsTitleElm.append("Projects");

  const projectsWrapper = document.createElement("div");
  projectsWrapper.id = "projectsWrapper";
  projectsWrapper.className = "projects__wrapper";
  mainElm.appendChild(projectsWrapper);

  const projectsCollabWrapper = document.createElement("span");
  projectsCollabWrapper.id = "projectsCollab";
  projectsCollabWrapper.className = "projects__column";
  projectsWrapper.append(projectsCollabWrapper);

  const projectsCollabTitleElm = document.createElement("h2");
  
  projectsCollabWrapper.append(projectsCollabTitleElm);
  projectsCollabTitleElm.append("Collaborative");

  const projectsSoloWrapper = document.createElement("span");
  projectsSoloWrapper.id = "projectsSolo";
  projectsSoloWrapper.className = "projects__column";
  projectsWrapper.append(projectsSoloWrapper);

  const projectsSoloTitleElm = document.createElement("h2");

  projectsSoloWrapper.append(projectsSoloTitleElm);
  projectsSoloTitleElm.append("Solo");

  data.forEach(project => {
    if (project.category === "collab") {
      projectsCollabWrapper.appendChild(makeProjectCard(project));
    } else if (project.category === "solo") {
      projectsSoloWrapper.appendChild(makeProjectCard(project));
    }
  });

  return mainElm;
};

const makeProjectCard = obj => {
  const projectCardElm = document.createElement("section");
  projectCardElm.className = "projects__item";

  const projectLinkElm = document.createElement("a");
  projectLinkElm.href = obj.link;
  projectLinkElm.target = "_blank";
  projectCardElm.append(projectLinkElm);

  const projectTitleElm = document.createElement("span");
  projectTitleElm.className = "projects__title";
  projectCardElm.append(projectTitleElm);
  projectTitleElm.append(obj.title);

  const projectContentElm = document.createElement("img");
  projectContentElm.src = obj.img;
  projectContentElm.className = "projects__img";
  projectLinkElm.append(projectContentElm);

  return projectCardElm;
};

module.exports = makeProjects;
