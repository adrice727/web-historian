var fs = require('fs');
var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var get = require('./get-handler').get;
var post = require('./post-handler').post;
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  switch (req.method) {
    case 'GET':
      get(req, res);
      break;
    case 'POST':
      post(req, res);
  }
};

var serve = function(res, status, data){
  res.writeHead(status, {'Content-Type': 'text/html'});
  res.end(data);
};

// var get = function(req, res) {
//   var pathname = url.parse(req.url).pathname;
//   if ( pathname === '/') {
//     pathname = '/index.html';
//   }
//   req.pathname = pathname;

//   getAsset(req, res);
// };

// var getAsset = function(req, res) {
//   fs.readFile(path.join(archive.paths.siteAssets, req.pathname), function (err, data) {
//     if (err) {
//       getArchive(req, res);
//     } else {
//       serve(res, 200, data);
//     }
//   });
// };

// var getArchive = function(req, res) {
//   fs.readFile(path.join(archive.paths.archivedSites, req.pathname), function (err, data) {
//     if (err) {
//       checkList(req, res);
//     } else {
//       serve(res, 200, data);
//     }
//   });
// };

// var checkList = function(req, res) {
//   fs.readFile(archive.paths.list, function (err, data) {
//     if (err) {
//       serve(res, 500);
//     } else {
//       if (req.pathname[0] === '/') {
//         req.pathname = req.pathname.substr(1);
//       }
//       if (data.toString().indexOf(req.pathname + '/n') !== -1){
//         req.pathname = '/loading.html';
//         getAsset(req, res);
//       } else {
//         serve(res, 404);
//       }
//     }
//   });
// };

