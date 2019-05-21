const loaderUtils = require('loader-utils');
const cachedFilesUrlsKeeper = require('./CachedFilesUrlsKeeper');

module.exports = function serverFetchDataCreator(content, map) {
  const options = loaderUtils.getOptions(this);
  const { fetchPropertyName } = options;
  if (fetchPropertyName) {
    const index = content.indexOf(fetchPropertyName);
    const path = map.file.split('client').pop();
    if (index > -1) {
      cachedFilesUrlsKeeper.setUrl(path, true);
    } else if (cachedFilesUrlsKeeper.isExistUrl(path)) {
      cachedFilesUrlsKeeper.setUrl(path, false);
      cachedFilesUrlsKeeper.removeUrl(path);
    }
  }
  return content;
};
