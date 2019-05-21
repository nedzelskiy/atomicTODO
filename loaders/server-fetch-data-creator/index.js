const loaderUtils = require('loader-utils');
const cachedFilesUrlsKeeper = require('./CachedFilesUrlsKeeper');

module.exports = function serverFetchDataCreator(content, map) {
  const options = loaderUtils.getOptions(this);
  const { fetchPropertyName } = options;
  if (fetchPropertyName) {
    const index = content.indexOf(fetchPropertyName);
    if (index > -1) {
      cachedFilesUrlsKeeper.setUrl(map.file, true);
    } else if (cachedFilesUrlsKeeper.isExistUrl(map.file)) {
      cachedFilesUrlsKeeper.setUrl(map.file, false);
      cachedFilesUrlsKeeper.removeUrl(map.file);
    }
  }
  return content;
};
