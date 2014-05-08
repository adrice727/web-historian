var archive = require("../helpers/archive-helpers");

archive.readListOfUrls(function(list) {
  for (var i = 0; i < list.length; i++) {
    archive.isURLArchived(list[i], function(url, isArchived) {
      console.log(url);
      isArchived || archive.downloadUrl(url);
    });
  }
});
