var http = require("http");
var handler = require("./request-handler");
var cronJob = require("cron").CronJob;
var archive = require("../workers/htmlfetcher").archive;

new cronJob({
  cronTime: '* * * * *',
  onTick: function() {
    archive();
  },
  start: true
});

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

