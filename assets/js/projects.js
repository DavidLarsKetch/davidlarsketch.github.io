"use strict";

const $ = require("jquery");
const storage = require("./storage");

let projectsData = {};
const $projectsContainer = $("#projectsContainer");

const makeProjects = data => {
  const mainElm = document.createElement("main");
  const projectsTitleElm = document.createElement("h1");
  mainElm.append(projectsTitleElm);
  projectsTitleElm.append("Projects");

  const projectsWrapper = document.createElement("div");
  projectsWrapper.id = "projectsWrapper";
  projectsWrapper.className = "projects-wrapper";
  mainElm.appendChild(projectsWrapper);

  const projectsCollabWrapper = document.createElement("span");
  projectsCollabWrapper.id = "projectsCollab";
  projectsCollabWrapper.className = "projects-column projects-collab";
  projectsWrapper.append(projectsCollabWrapper);

  const projectsCollabTitleElm = document.createElement("h3");
  projectsCollabWrapper.append(projectsCollabTitleElm);
  projectsCollabTitleElm.append("Collaborative");

  const projectsSoloWrapper = document.createElement("span");
  projectsSoloWrapper.id = "projectsSolo";
  projectsSoloWrapper.className = "projects-column projects-solo";
  projectsWrapper.append(projectsSoloWrapper);

  const projectsSoloTitleElm = document.createElement("h3");
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
  projectCardElm.className = "project-item";

  const projectLinkElm = document.createElement("a");
  projectLinkElm.href = obj.link;
  projectLinkElm.target = "_blank";
  projectCardElm.append(projectLinkElm);

  const projectTitleElm = document.createElement("span");
  projectTitleElm.className = "project-title";
  projectCardElm.append(projectTitleElm);
  projectTitleElm.append(obj.title);

  const projectContentElm = document.createElement("img");
  projectContentElm.src = obj.img;
  projectContentElm.className = `project-img ${obj.category}`;
  projectLinkElm.append(projectContentElm);

  return projectCardElm;
};

const projectMaker = () => {
  projectsData = storage.retrieve("projectsData");
  if (!projectsData) {
    const loader = new XMLHttpRequest();

    loader.addEventListener("load", () => {
      projectsData = JSON.parse(loader.responseText);
      projectsContainer.appendChild(makeProjects(projectsData.projects));
      storage.save("projectsData", projectsData);

    });
    loader.open("GET", "./assets/json/projects.json");
    loader.send();
  } else {
    projectsContainer.appendChild(makeProjects(projectsData.projects));
  }
};

module.exports = projectMaker;
