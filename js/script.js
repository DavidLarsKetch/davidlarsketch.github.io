const blogger = {
  xhrJSON: () => {
    const loader = new XMLHttpRequest();

    loader.addEventListener("load", function() {
      let response = JSON.parse(loader.responseText);
      const blogContainer = document.getElementById("blogContainer");
      blogContainer.appendChild(blogger.makeBlog(response.entries));
    });
    loader.open("GET", "blog.json");
    loader.send();
  },
  makeBlog: data => {
    const mainElm = document.createElement("main");
    const blogTitleElm = document.createElement("h1");
    const blogTitleNode = document.createTextNode("Blog");
    const blogHolder = document.createElement("div");

    blogHolder.id = "blogHolder";
    blogHolder.className = "blog";

    data.forEach(entry => blogHolder.appendChild(blogger.makeBlogCard(entry)));

    mainElm.appendChild(blogTitleElm);
    blogTitleElm.appendChild(blogTitleNode);
    mainElm.appendChild(blogHolder);
    
    return mainElm;
  },
  makeBlogCard: obj => {
    const entryCardElm = document.createElement("div");

    const entryTitleElm = document.createElement("h4");
    const entryTitleNode = document.createTextNode(obj.title);

    const entryDateElm = document.createElement("div");
    const entryDateNode = document.createTextNode(obj.date);

    const entryContentElm = document.createElement("span");
    const entryContentNode = document.createTextNode(obj.content);

    entryCardElm.className = "blog-item";
    entryTitleElm.className = "blog-title";
    entryDateElm.className = "blog-date";
    entryContentElm.className = "blog-text";

    entryCardElm.appendChild(entryTitleElm);
    entryTitleElm.appendChild(entryTitleNode);
    entryCardElm.appendChild(entryDateElm);
    entryDateElm.appendChild(entryDateNode);
    entryCardElm.appendChild(entryContentElm);
    entryContentElm.appendChild(entryContentNode);

    return entryCardElm;
  }
}
blogger.xhrJSON();
