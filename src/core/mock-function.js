var http = require("http");

var nameQueryString = "name=Test%20Clocal";

var nameBodyJSON = {
    name : "Test Clocal",
};

var bodyString = JSON.stringify(nameBodyJSON);

var options = {
  host: "clocal-azure.azurewebsites.net",
  path: "/api/HttpTriggerJS1?code=OU56/sGqK0M9dWi1UCMUs0JnP30tk4jO50ZhRT3amPe/unsmraB/YQ==&" + nameQueryString,
  //path: "/api/HttpTriggerJS1",
  method: "POST",
  headers : {
      "Content-Type":"application/json",
      "Content-Length": Buffer.byteLength(bodyString)
    }    
};

callback = function(response) {
  var str = ""
  response.on("data", function (chunk) {
    str += chunk;
  });

  response.on("end", function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
console.log("*** Sending name in body ***");
console.log(bodyString);
req.end(bodyString);
