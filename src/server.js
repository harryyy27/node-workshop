var http = require("http");
var fs = require("fs");

var message = "Harry and Jessie are lovin' the Node Girls workshop!";

function handler(request, response) {
  var extension = {
    html: "text/html",
    css: "text/css",
    jpg: "image/jpg",
    png: "image/png",
    js: "text/javascript",
    ico: "image/x-icon"
  };
  var endpoint = request.url;

  if (endpoint === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });

    fs.readFile(__dirname + "/../public/index.html", function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else {
    var key = endpoint.split(".")[1];
    response.writeHead(200, `Content-Type: ${extension[key]}`);

    fs.readFile(__dirname + `/../public${endpoint}`, function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }
}
var server = http.createServer(handler);

server.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
