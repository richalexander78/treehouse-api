//Require Node.js' https module and assign it to the variable https.
const https = require('https');

//Require http module for status codes
const http = require('http');

// Print Error Messages
function printError(error) {
  console.error(error.message);
}


//Funtion to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}


function get(username) {
  //if bad arguments catch errors
  try {
    //Connect to the API (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
      
      if (response.statusCode === 200) {
        let body = "";
        
        //One data event, convert to string, attach to body variable
        response.on('data', (data) => {
          body += data.toString();
        });
        
        //One end event, parse data, 
        response.on('end', () => {
          //If parsing error
          try {
            //Parse the data (convert string into an object data structure)
            const profile = JSON.parse(body);
            //Print chosen data using printMessage function
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
              printError(error);
          } //end catch
        });
      } else {
        //http.STATUS_CODES object to access the short descriptions for standard HTTP status codes.
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    }); //end request
  
    //Error handeling for 'error' event using the error object in the callback and displaying the error object's message property
    request.on('error', printError);
  
  } catch (error) {
      printError(error);  
  }// end try
}//end getProfile

//State what is available when required
module.exports.get = get;

