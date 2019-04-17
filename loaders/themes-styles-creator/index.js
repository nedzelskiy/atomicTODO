const loaderUtils = require('loader-utils');
const ThemeCreatorPlugin = require('./ThemesStylesCreatorPlugin');

module.exports = function themeCreatorLoader() {
  ThemeCreatorPlugin.cachedStylesKeys.push(`m${loaderUtils.getCurrentRequest(this)}`);
  return '';
};
