const loaderUtils = require('loader-utils');
const ThemeCreatorPlugin = require('./ThemeCreatorPlugin');

module.exports = function() {
  ThemeCreatorPlugin.cachedStylesKeys.push(`m${loaderUtils.getCurrentRequest(this)}`);
  return '';
};