const checkInstallButton = document.getElementById("checkInstallButton");
checkInstallButton.addEventListener("click", checkInstall);

const refreshPageButton = document.getElementById("refreshPageButton");
refreshPageButton.addEventListener("click", refreshPage);

const connectedSection = document.getElementById("connectedSection");
connectedSection.style.display = "none";

const errorSection = document.getElementById("errorSection");
errorSection.style.display = "none";

const apiErrorSection = document.getElementById("errorSection");
errorSection.style.display = "none";

const envFileLink = document.getElementById("envFileLink");
const projectURL = document.getElementById("project_url");

let domainName = "";

function checkInstall() {
  console.log("test");
  return fetch("/checkinstall/").then(res => res.json())
    .then(resJson => {
      if (resJson.error) {
        console.log(resJson.error);
        if(resJson.error == "notoken"){
                      errorSection.style.display = "block";

        }

      } else {
             connectedSection.style.display = "block";

      }
      return Promise.resolve();
    });
}

function refreshPage() {
  location.reload();
}

function getDomain() {
  console.log("test");
  return fetch("/domainname/")
    .then(res => res.json())
    .then(resJson => {
      if (resJson.error) {
        console.log(resJson.error);
      } else {
        console.log(resJson.message);
        domainName = resJson.message;
        console.log("domain name " + domainName);
        projectURL.value = "https://" + domainName + ".glitch.me"
        envFileLink.href =
          "https://glitch.com/edit/#!/" + domainName + "?path=.env:10";
      }
      return Promise.resolve();
    });
}

getDomain();

function clipboard(element) {
  let copyText = document.getElementById(element);
  copyText.select();
  document.execCommand("Copy");
}

function generateEnv() {
  let discordToken =
    document.getElementById("discordToken").value || "<Your token value here>";
    let discordClientID =
    document.getElementById("discordClientID").value || "<Your client ID value here>";
  
  let env = `# Environment Config

# store your secrets and config variables in here
# only invited collaborators will be able to see your .env values

# reference these in your code with process.env.SECRET

DISCORD_TOKEN=${discordToken}
CLIENT_ID=${discordClientID}

# note: .env is a shell file so there can't be spaces around =
`;
  document.getElementById("env_file").value = env;
}

generateEnv();
