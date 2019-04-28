let domainName;
const domainNameTitle = document.getElementById("domain-name-title");

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
        domainNameTitle.innerHTML = domainName;
      }
      return Promise.resolve();
    });
}

getDomain();

/*function monitor(){
  console.log("test");
 return fetch("/monitor/")
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


setInterval(monitor, 60 * 1000);*/


