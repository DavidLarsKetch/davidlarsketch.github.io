const container = document.getElementById("container")
const div = document.createElement("div");
const textNode = document.createTextNode("Hey, I come from script.js");

container.appendChild(div);
div.appendChild(textNode);
