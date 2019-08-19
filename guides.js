/* This section of code is used by the install and setup guides, if you modify it make sure you still are hosting a webpage (seen in "show") or Uptime Robot will stop working */

const express = require("express");
const router = express.Router();
const discordBotkit = require("botkit-discord");
const Client = require("uptime-robot");
const discordBot = require("./bot");

router.get("/guide", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

router.get("/install", function(request, response) {
  response.sendFile(__dirname + "/views/install.html");
});

router.get("/domainname", function(request, response) {
  let domain = process.env.PROJECT_DOMAIN;
  response.status(200).json({
    message: domain
  });
});

router.get("/botinfo", async function(request, response) {
  let authURL;
  let domain = process.env.PROJECT_DOMAIN;
  let uptime = process.uptime();
  let uptimeRobot;
  let uptimeRobotApiKey = false;
  let uptimeRobotMonitor = false;
  
  try {
     authURL = "https://discordapp.com/api/oauth2/authorize?client_id=" +
    discordBot.config.client.user.id +
    "&permissions=0&scope=bot";
  } catch (e) {
    console.log("Error caught");
  }


  try {
    uptimeRobot = await new Client(process.env.UPTIME_ROBOT_KEY);
    uptimeRobotApiKey = true;
  } catch (e) {
    console.log("Error caught");
  }

  try {
    let monitors = await uptimeRobot.getMonitors();

    monitors.forEach(function(monitor) {
      if (
        monitor.url ==
        "https://" + process.env.PROJECT_DOMAIN + ".glitch.me"
      ) {
        uptimeRobotMonitor = true;
      }
    });
  } catch (e) {
    console.log("Error caught");
  }

  response.status(200).json({
    url: authURL,
    domain: domain,
    uptime: uptime,
    uptimeRobotApiKey: uptimeRobotApiKey,
    uptimeRobotMonitor: uptimeRobotMonitor
  });
});

router.get("/monitor", function(request, response) {
  let uptime = process.uptime();
  try {
    const uptimeRobot = new Client(process.env.UPTIME_ROBOT_KEY);
    uptimeRobot.getMonitors({}, function(err, monitors) {
      if (err) throw response.status(200).json(err);
      let setup = 1;
      monitors.forEach(function(monitor) {
        if (
          monitor.url ==
          "https://" + process.env.PROJECT_DOMAIN + ".glitch.me"
        ) {
          setup = 2;
        }
      });

      response.status(200).json({
        status: setup,
        uptime: uptime
      });
    });
  } catch (error) {
    console.log("error");
    response.status(200).json({
      status: 0,
      uptime: uptime
    });
  }
});

router.get("/createMonitor", function(request, response) {
  const uptimeRobot = new Client(process.env.UPTIME_ROBOT_KEY);

  uptimeRobot.newMonitor(
    {
      friendlyName: process.env.PROJECT_DOMAIN,
      url: "https://" + process.env.PROJECT_DOMAIN + ".glitch.me",
      type: 1,
      interval: 5
    },
    function(err, res) {
      if (err) throw response.status(200).json(err);
      response.status(200).json(res);
    }
  );
});

router.get("/checkinstall", function(request, response) {
  if (!process.env.DISCORD_TOKEN) {
    console.log("no token");
    response.send(500, { error: "notoken" });
  } else {
    console.log("token");

    const testBotConfig = {
      token: process.env.DISCORD_TOKEN
    };

    var customTimeout = 5000;

    response.setTimeout(customTimeout, function(){
      response.send(500, { error: "timeout" });
    });

    const testBot = discordBotkit(testBotConfig);
    console.log(testBot);
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
if (process.env.GUIDE){
  router.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/remix.html");
  });
}
else if (!process.env.DISCORD_TOKEN) {
  router.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/install.html");
  });
} else {
  router.get("/", function(request, response) {
    response.sendFile(__dirname + "/views/index.html");
  });
}

module.exports = router;
