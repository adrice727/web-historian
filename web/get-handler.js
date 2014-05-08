var serve = require('../helpers/handler-helpers').serve;
var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');


exports.get = function (req, res) {

  var pathname = url.parse(req.url).pathname;

  if (pathname === '/'){
    pathname = '/index.html';
  }
  req.pathname = pathname;

  getAsset(req, res);

};

var getAsset = function(req, res){
  fs.readFile( path.join(archive.paths.siteAssets, req.pathname), function(err, data){
    if (err) {
      getArchive(req, res);
    } else {
      var extTypes = {
        '.css': 'text/css',
      };
      serve(res, 200, data, extTypes[path.extname(req.pathname)]);
    }
  });
};

var getArchive = function(req, res){
  fs.readFile( path.join(archive.paths.archivedSites, req.pathname), function(err, data){
    if (err) {
      checkList(req, res);
    } else {
      serve(res, 200, data);
    }
  });
};

var checkList = function(req, res){

  fs.readFile( archive.paths.list, function(err, data){
    if (err){
      serve(res, 500);
    } else {
      if ( req.pathname[0] === '/'){
        req.pathname = req.pathname.substr(1);
      }
      if ( data.toString().indexOf(req.pathname + '\n') !== -1 ){
        serve(res, 302, '/loading.html');
      } else {
        serve(res, 404);
      }
    }
  });
};
