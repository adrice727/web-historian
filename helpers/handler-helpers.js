exports.serve = function (res, status, data, contentType, location) {
  var headers = {};
  headers['Content-Type'] = contentType || 'text/html';
  if (location) headers['Location'] = location;
  res.writeHead(status, headers);
  res.end(data);
};
