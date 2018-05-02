"use strict";

const $ = require("jquery");
const md = require('markdown').markdown;

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

  const [
    projectsCollabWrapper,
    projectsCollabItemsElm
  ] = makeProjectColumn('Collab');
  projectsWrapper.append(projectsCollabWrapper);

  const [
    projectsSoloWrapper,
    projectsSoloItemsElm
  ] = makeProjectColumn('Solo');
  projectsWrapper.append(projectsSoloWrapper);

  const [
    projectsVolWrapper,
    projectsVolItemsElm
  ] = makeProjectColumn('Volunteer');
  projectsWrapper.append(projectsVolWrapper);

  data.forEach(project => {
    if (project.category === "collab") {
      projectsCollabItemsElm.appendChild(makeProjectCard(project));
    } else if (project.category === "solo") {
      projectsSoloItemsElm.appendChild(makeProjectCard(project));
    } else if (project.category === "volunteer") {
      projectsVolItemsElm.appendChild(makeProjectCard(project));
    }
  });

  return mainElm;
};

const makeProjectCard = ({link, title, img, desc}) => {
  const projectCardElm = document.createElement("section");
  projectCardElm.className = "projects__item";

  const projectLinkElm = document.createElement("a");
  projectLinkElm.href = link;
  projectLinkElm.target = "_blank";
  projectCardElm.append(projectLinkElm);

  const projectTitleElm = document.createElement("span");
  projectTitleElm.className = "projects__title";
  projectCardElm.append(projectTitleElm);
  projectTitleElm.append(title);

  const projectImageElm = document.createElement("img");
  projectImageElm.src = img;
  projectImageElm.className = "projects__img";
  projectLinkElm.append(projectImageElm);

  const projectDescElm = document.createElement("div");
  projectDescElm.className = "projects__description";
  projectDescElm.innerHTML = md.toHTML(desc || '');
  projectCardElm.append(projectDescElm);

  return projectCardElm;
};

const makeProjectColumn = name => {
  let wrapper = document.createElement('span');
  wrapper.id = `projects${name}`;
  wrapper.className = "projects__column";

  let title = document.createElement('h2');
  title.append(name);

  let items = document.createElement('div');
  items.className = "projects__items";

  wrapper.append(title);
  wrapper.append(items);

  return [wrapper, items];
};

module.exports = makeProjects;
