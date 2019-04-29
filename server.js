// server.js
// where your node app starts

// init project
const express = require("express");
const fs = require("fs");
const discordBotkit = require("botkit-discord");

const app = express();
const discordBot = require("./bot");

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.get("/guide", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/install", function(request, response) {
  response.sendFile(__dirname + "/views/install.html");
});

app.get("/domainname", function(request, response) {
  let domain = process.env.PROJECT_DOMAIN;
  response.status(200).json({
    message: domain
  });
});

app.get("/clientid", function(request, response) {
  let clientID = process.env.CLIENT_ID;
  let domain = process.env.PROJECT_DOMAIN;

  response.status(200).json({
    client: clientID,
    domain: domain
  });
});

app.get("/monitor", function(request, response) {
  let uptime = process.uptime();
  response.status(200).json({
    message: uptime
  });
});

app.get("/checkinstall", function(request, response) {
  if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
    console.log("no token");
    response.send(500, { error: "notoken" });
  } else {
    console.log("token");

    const testBotConfig = {
      token: process.env.DISCORD_TOKEN
    };

    const testBot = discordBotkit(testBotConfig);
    //  console.log(testBot);
    testBot.on("disconnect", event => {
      response.send(500, { error: "apierror" });
    });

    testBot.on("ready", event => {
      response.status(200).json({
    message: "yay"
  });
    });
  }
});

if (!process.env.DISCORD_TOKEN) {
  app.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/install.html");
  });
} else {
  app.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/index.html");
  });

}

// http://expressjs.com/en/starter/basic-routing.html
/*app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});*/

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
