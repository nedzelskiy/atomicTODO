const loaderUtils = require('loader-utils');
const cachedFilesUrlsKeeper = require('./CachedFilesUrlsKeeper');

module.exports = function serverFetchDataCreator(content, map) {
  const options = loaderUtils.getOptions(this);
  if (options.fetchPropertyName) {
    const index = content.indexOf(options.fetchPropertyName);
    if (index > -1) {
      cachedFilesUrlsKeeper.setUrl(map.file, true);
    } else if (cachedFilesUrlsKeeper.getUrls()[map.file]) {
      cachedFilesUrlsKeeper.setUrl(map.file, false);
    }
  }
  return content;
};
