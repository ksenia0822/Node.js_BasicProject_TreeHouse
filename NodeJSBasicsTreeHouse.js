var http = require("http");



function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

function printError(error) {
    console.error(error.message);
  }

function get(username) {

  var request = http.get("http://teamtreehouse.com/chalkers.json", function(response) {
    var responseBody = "";

    response.on("data", function(dataChunk) {
      responseBody += dataChunk;
    });

    response.on("end", function(dataChunk) {
      if(response.statusCode === 200) {
        try {
          var profile = JSON.parse(responseBody);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch (error) {
          printError(error);
        }
      } else {
          printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
        }
    });
  });
  
  request.on("error", printError);
}

module.exports.get = get;




