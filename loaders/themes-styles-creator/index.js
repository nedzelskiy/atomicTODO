const loaderUtils = require('loader-utils');
const { cachedStylesKeysKeeper } = require('./CachedStylesKeysKeeper');

module.exports = function themeCreatorLoader() {
  cachedStylesKeysKeeper.addKey(`m${loaderUtils.getCurrentRequest(this)}`);
  return '';
};
