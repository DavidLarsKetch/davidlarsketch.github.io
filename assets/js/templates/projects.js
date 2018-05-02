"use strict";

const $ = require("jquery");
const md = require('markdown').markdown;

const makeProjects = data => {
  let projectsData = [{data: []}, {data: []}, {data: []}];
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
  projectsData[0].target = projectsCollabItemsElm;

  const [
    projectsSoloWrapper,
    projectsSoloItemsElm
  ] = makeProjectColumn('Solo');
  projectsWrapper.append(projectsSoloWrapper);
  projectsData[1].target = projectsSoloItemsElm;

  const [
    projectsVolWrapper,
    projectsVolItemsElm
  ] = makeProjectColumn('Volunteer');
  projectsWrapper.append(projectsVolWrapper);
  projectsData[2].target = projectsVolItemsElm;

  data.map(project => {
    if (project.category === "collab") {
      projectsData[0].data.push(project);
    } else if (project.category === "solo") {
      projectsData[1].data.push(project);
    } else if (project.category === "volunteer") {
      projectsData[2].data.push(project);
    }
  });

  projectsData.map(({data}) => data.sort((a,b) => a.date < b.date));

  projectsData.map(({target, data}) => data.map(project =>
    target.append(makeProjectCard(project))
  ));

  return mainElm;
};

const makeProjectCard = ({link, title, img, desc, tech = []}) => {
  const projectCardElm = document.createElement("section");
  projectCardElm.className = "projects__item";

  const projectTitleElm = document.createElement("h2");
  projectTitleElm.className = "projects__title";
  projectCardElm.append(projectTitleElm);
  projectTitleElm.append(title);

  const projectLinkElm = document.createElement("a");
  projectLinkElm.href = link;
  projectLinkElm.target = "_blank";
  projectCardElm.append(projectLinkElm);

  const projectImageElm = document.createElement("img");
  projectImageElm.src = img;
  projectImageElm.className = "projects__img";
  projectLinkElm.append(projectImageElm);

  const projectIconsElm = document.createElement("div");
  projectIconsElm.className = "projects__icons";
  tech.forEach(item => projectIconsElm.append(makeIcon(item)));
  projectCardElm.append(projectIconsElm);


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

const makeIcon = ({img, link = "#", name}) => {
  const iconLink = document.createElement("a");
  if (link !== "#") {
    iconLink.href = link;
    iconLink.target = "_blank";
  }
  iconLink.className = "projects__icon";

  const iconImg = document.createElement("img");
  iconImg.src = img;
  iconImg.alt = name;

  iconLink.append(iconImg);

  return iconLink;
};

module.exports = makeProjects;
