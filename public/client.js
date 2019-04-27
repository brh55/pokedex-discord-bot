
function monitor(){
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


setInterval(monitor, 60 * 1000);


