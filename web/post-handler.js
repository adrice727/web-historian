var serve = require('../helpers/handler-helpers').serve;
var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var get = require('./get-handler').get;
var qs = require('querystring');


exports.post = function(req, res) {

  var data = '';
  req.on('data', function(chunk){
    data+= chunk;
  });

  req.on('end', function(){
    req.data = qs.parse(data).url;
    checkForExisting(req, res);
  });

};

var checkForExisting = function(req, res){
  fs.readFile(archive.paths.list, function(err, data){
    if (err){
      serve(res, 500);
    } else {
      if ( data.toString().indexOf(req.data + '\n') === -1 ){
        updateArchive(req, res);
      } else {
        serve(res, 302, path.join('/', req.data));
      }
    }
  });
};


var updateArchive = function(req, res){
  fs.appendFile(archive.paths.list, req.data + '\n', function(err, written, buffer){
    if (err){
      serve(res, 500);
    } else {
      serve(res, 302, path.join('/', req.data))
    }
  });
};

