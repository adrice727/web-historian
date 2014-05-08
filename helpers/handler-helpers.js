exports.serve = function (res, status, data, contentType) {
  res.writeHead(status, {'Content-Type': contentType || 'text/html'});
  res.end(data);
};
