"use strict";

const storage = require("./storage");

let projectsData = {};
const projectsContainer = document.getElementById("projectsContainer");

const makeProjects = data => {
  const mainElm = document.createElement("main");
  const projectsTitleElm = document.createElement("h1");
  const projectsTitleNode = document.createTextNode("Projects");
  const projectsWrapper = document.createElement("div");
  const projectsCollabWrapper = document.createElement("span");
  const projectsCollabTitleElm = document.createElement("h3");
  const projectsCollabTitleNode = document.createTextNode("Collaborative");
  const projectsSoloWrapper = document.createElement("span");
  const projectsSoloTitleElm = document.createElement("h3");
  const projectsSoloTitleNode = document.createTextNode("Solo");

  projectsWrapper.id = "projectsWrapper";
  projectsWrapper.className = "projects-wrapper";
  projectsCollabWrapper.id = "projectsCollab";
  projectsCollabWrapper.className = "projects-column projects-collab";
  projectsSoloWrapper.id = "projectsSolo";
  projectsSoloWrapper.className = "projects-column projects-solo";

  mainElm.appendChild(projectsTitleElm);
  projectsTitleElm.appendChild(projectsTitleNode);
  projectsWrapper.appendChild(projectsCollabWrapper);
  projectsWrapper.appendChild(projectsSoloWrapper);
  projectsCollabWrapper.appendChild(projectsCollabTitleElm);
  projectsCollabTitleElm.appendChild(projectsCollabTitleNode);
  projectsSoloWrapper.appendChild(projectsSoloTitleElm);
  projectsSoloTitleElm.appendChild(projectsSoloTitleNode);
  mainElm.appendChild(projectsWrapper);

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


  const projectLinkElm = document.createElement("a");
  const projectContentElm = document.createElement("img");

  const projectTitleElm = document.createElement("span");
  const projectTitleNode = document.createTextNode(obj.title);

  projectCardElm.className = "project-item";
  projectLinkElm.href = obj.link;
  projectLinkElm.target = "_blank";
  projectContentElm.src = obj.img;
  projectContentElm.className = `project-img ${obj.category}`;
  projectTitleElm.className = "project-title";

  projectCardElm.appendChild(projectLinkElm);
  projectCardElm.appendChild(projectTitleElm);
  projectLinkElm.appendChild(projectContentElm);
  projectTitleElm.appendChild(projectTitleNode);

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
