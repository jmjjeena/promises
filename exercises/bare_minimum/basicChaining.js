/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(function(firstLine) {
      if (!firstLine) {
        throw new Error('File does not exist');
      } else {
        return getGitHubProfileAsync(firstLine);
      }
    })
    .then (function(profile) {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(profile));
    });
};


// var addNewUserToDatabaseAsync = function(user) {
//   // The outermost `return` lets us continue the chain
//   // after an invocation of `addNewUserToDatabaseAsync`
//   return db.findUserInDatabaseAsync(user)
//     .then(function(existingUser) {
//       if (existingUser) {
//         throw new Error('User already exists!') // Head straight to `catch`. Do not pass Go, do not collect $200
//       } else {
//         return user; // Return a synchronous value
//       }
//     })
//     .then(function(newUser) {
//       return db.hashPasswordAsync(newUser) // Return a promise
//     })
//     .then(function(securedUser) {
//       return db.createAndSaveUserAsync(securedUser) // Return another promise
//     })
// }
// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
