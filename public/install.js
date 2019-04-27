const checkInstallButton = document.getElementById("checkInstallButton");
checkInstallButton.addEventListener('click', checkInstall);


function checkInstall(){
  console.log("test");
 return fetch("/checkinstall/")
    .then(res => console.log(res))
}


