// View Treehouse user's badge count and JavaScript points
// Useing Node.js, connect to Treehouse's API to get profile information to print out
// https://nodejs.org/api/https.html#https_https_get_url_options_callback

//get profile from same directory
const profile = require('./profile.js');


//Array of usernames for profile view
//const users = ["richardalexander3", "alenaholligan", "davemcfarland"];

//Node 'process' Global Object where we can access the current version of node and arguments passed in to the command line.The command line arguments can be accessed through the 'argv' property on the `process` object.
const users = process.argv.slice(2);

//Longform forEach loop
//users.forEach(username => {
//  getProfile(username);
//});

//Invoke function, shorthand since only one parameter is used
users.forEach(profile.get);
