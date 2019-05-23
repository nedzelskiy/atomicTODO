const loaderUtils = require('loader-utils');
const cachedFilesUrlsKeeper = require('./CachedFilesUrlsKeeper');

module.exports = function serverFetchDataCreator(content, map) {
  const options = loaderUtils.getOptions(this);
  const { fetchPropertyName } = options;
  if (fetchPropertyName) {
    const index = content.indexOf(fetchPropertyName);
    const path = map.file;
    if (index > -1) {
      cachedFilesUrlsKeeper.setUrl(path);
    } else if (cachedFilesUrlsKeeper.isExistUrl(path)) {
      cachedFilesUrlsKeeper.removeUrl(path);
    }
  }
  return content;
};
