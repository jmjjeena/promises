/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      var lines = data.toString();
      lines = lines.split("\n");
      callback(null, lines[0]);
    }
  })
};

// This function should retrieve the stats code of a GET requuest to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request(url, (err, response) => {
    if(err) {
      callback(err);
    } else {
      callback(null, response.statusCode);
    }
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
