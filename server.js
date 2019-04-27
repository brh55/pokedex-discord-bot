// server.js
// where your node app starts

// init project
const express = require("express");
const fs = require("fs");

const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

if (!process.env.DISCORD_TOKEN) {
  app.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/install.html");
  });

  app.get("/env/:token", function(request, response) {
    fs.readFile(".env", function(err, data) {
      if (err) {
        return console.error(err);
      }

      var result = data
        .toString()
        .replace(/DISCORD_TOKEN=/g, "DISCORD_TOKEN=meow");

      fs.writeFile(".env", result, "utf8", function(err) {
        if (err) return console.log(err);
      });
    });
    response.send(200);
  });
}

app.get("/env", function(request, response) {
  fs.readFile(".env", function(err, data) {
    if (err) {
      return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());

    var result = data
      .toString()
      .replace(/DISCORD_TOKEN=/g, "DISCORD_TOKEN=meow");

    fs.writeFile(".env", result, "utf8", function(err) {
      if (err) return console.log(err);
    });
  });
  response.send(200);
});
// http://expressjs.com/en/starter/basic-routing.html
/*app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});*/

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
