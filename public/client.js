let domainName;
let authUrl;
let addBotLink;
const domainNameTitle = document.getElementsByClassName("domain-name-title");
const addBotCopy = document.getElementById("add-bot-link");

const oauthUrl = document.getElementById("oauth-url");
const oauthUrlGo = document.getElementById("oauth-url-go");

const noClientFound = document.getElementById("no-client-found");
noClientFound.style.display = "none";

const clientFound = document.getElementById("client-found");
clientFound.style.display = "none";

const uptimeNotFound = document.getElementById("uptime-not-found");
uptimeNotFound.style.display = "none";

const uptimeNotSetUp = document.getElementById("uptime-not-set-up");
uptimeNotSetUp.style.display = "none";

const uptimeWorking = document.getElementById("uptime-working");
uptimeWorking.style.display = "none";

const uptimeButton = document.getElementById("uptime-robot-button");
uptimeButton.style.display = "none";

const readmeFileLink = document.getElementById("readme-file-link");



function getDomain() {
  console.log("test");
  return fetch("/botinfo/")
    .then(res => res.json())
    .then(resJson => {
      if (resJson.error) {
        console.log(resJson.error);
      } else {
        domainName = resJson.domain;
        authUrl = resJson.url;

        console.log("domain name " + domainName);
        readmeFileLink.href = "https://glitch.com/edit/#!/" + domainName + "?path=readme.md:2:0";


        [...domainNameTitle].forEach(function(element) {
          element.innerHTML = domainName;
        });

        console.log(resJson);
        if (authUrl) {
          oauthUrl.value = authUrl;
          oauthUrlGo.href = authUrl;
          clientFound.style.display = "block";
        } else {
          noClientFound.style.display = "block";
        }

        if (resJson.uptimeRobotApiKey && resJson.uptimeRobotMonitor) {
          uptimeWorking.style.display = "block";
        } else if (resJson.uptimeRobotApiKey) {
          uptimeNotSetUp.style.display = "block";
          uptimeButton.style.display = "block";
        } else {
          uptimeNotFound.style.display = "block";
        }
      }
      return Promise.resolve();
    });
}

getDomain();

function monitorSetup() {
  console.log("test");
  return fetch("/createMonitor")
    .then(res => res.json())
    .then(resJson => {
      if (resJson.error) {
        console.log(resJson.error);
      } else {
        console.log(resJson.message);
      }
      return Promise.resolve();
    });
}

function clipboard(element) {
  let copyText = document.getElementById(element);
  copyText.select();
  document.execCommand("Copy");
}
