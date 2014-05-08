var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var GET = require('http-request').get;

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var paths = exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

var readListOfUrls = exports.readListOfUrls = function(callback){ // callback(list)
  fs.readFile(paths.list, function(err, data){
    callback(data.toString().split('\n').slice(0,-1));
  });
};

var isUrlInList = exports.isUrlInList = function(url, callback){ // callback(url, boolean)
  readListOfUrls(function(list) {
    callback(url, list.indexOf(url) !== -1);
  });
};

exports.addUrlToList = function(url, callback){ // callback(err)
  if (isUrlInList(url)) {
    fs.appendFile(paths.list, url, callback);
  }
};

exports.isURLArchived = function(url, callback){ // callback(url, data)
  fs.readFile(path.join(paths.archivedSites, url), function(err, data){
    err ? callback(url, undefined) : callback(url, data);
  });
};

exports.downloadUrl = function(url) {
  GET({url: url},
    path.join(paths.archivedSites, url),
    function () {});
};
