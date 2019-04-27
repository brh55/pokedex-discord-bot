const checkInstallButton = document.getElementById("checkInstallButton");
checkInstallButton.addEventListener("click", checkInstall);

const refreshPageButton = document.getElementById("refreshPageButton");
refreshPageButton.addEventListener("click", refreshPage);

const connectedSection = document.getElementById("checkInstallButton");


function checkInstall() {
  console.log("test");
  return fetch("/checkinstall/").then(res => {
    console.log(res);
    if (res.status === 200) {
      //awesome the token is working!
        
      } else {
      }
    return Promise.resolve();
  });
}


function refreshPage(){
 location.reload(); 

}