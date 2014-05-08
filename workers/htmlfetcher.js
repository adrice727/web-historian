var archive = require("../helpers/archive-helpers");

exports.archive = function() {
  archive.readListOfUrls(function(list) {
    for (var i = 0; i < list.length; i++) {
      archive.isURLArchived(list[i], function(url, isArchived) {
        isArchived || archive.downloadUrl(url);
      });
    }
  });
};
