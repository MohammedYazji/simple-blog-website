const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

// read data from the json file

// 1. read templates
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempPost = fs.readFileSync(
  `${__dirname}/templates/template-post.html`,
  "utf-8"
);

// 2. read posts data
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// parse data text into json [JS object]
const dataObj = JSON.parse(data); // array of objects

///////////////////////////////
// create the server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    // specific that we will send html
    res.writeHead(200, {
      "content-type": "text/html",
    });

    // for each post replace the card template with the real data
    // so this will return array so turn them into string
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    // then replace tempOverview and give it all cards
    const output = tempOverview.replace(/{{cards}}/g, cardsHtml);
    res.end(output);
  }
  // post page
  else if (pathname == "/post") {
    res.writeHead(200, { "content-type": "text/html" });
    const post = dataObj[query.id];
    const output = replaceTemplate(tempPost, post);
    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }
  // Not found Page
  else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

// listen the server
server.listen(3000, "127.0.0.1", () => {
  console.log("server is running on port 3000");
});
