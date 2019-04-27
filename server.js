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
  app.get("/test", function(request, response) {
    response.sendFile(__dirname + "/views/index.html");
  });
  app.get("/monitor", function(request, response) {
    let uptime = process.uptime();
    response.status(200).json({
      message: uptime
    });
  });

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
        .replace(/DISCORD_TOKEN=/g, "DISCORD_TOKEN"+ request.params.token);

      fs.writeFile(".env", result, "utf8", function(err) {
        if (err) return console.log(err);
            require('child_process').exec('refresh');

      });
    });
    response.send(200);
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


