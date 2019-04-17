/* eslint-disable no-console */
const PLUGIN_NAME = 'ThemesStylesCreatorPlugin';

const upath = require('upath');
const fse = require('fs-extra');
const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss/lib/postcss');

class ThemesStylesCreatorPlugin {
  static getSassVariable(name, value) {
    return `$${name}: ${value};`;
  }

  static getSassImport(path) {
    return `@import "${path}";`;
  }

  static consoleMessage(level, message) {
    console.log(`======> ${level.toUpperCase()} ${PLUGIN_NAME}: ${message}`);
  }

  static getSassVariables(variablesObj) {
    return Object.keys(variablesObj).map(name => ThemesStylesCreatorPlugin.getSassVariable(name, variablesObj[name])).join('\n');
  }

  static createCompilerData(sassEntry, sassVariables) {
    return ThemesStylesCreatorPlugin.getSassVariables(sassVariables)
      + ThemesStylesCreatorPlugin.getSassImport(sassEntry);
  }

  static getSassFilesPathsFromCachedStylesKeys(cachedStylesKeys) {
    return cachedStylesKeys.map(key => key.split('!').pop());
  }

  static getCompiledCssWithPostCss(cssData) {
    return postcss([autoprefixer]).process(cssData).css;
  }

  constructor(options) {
    this.readyStyleFiles = {};
    this.options = options;
    this.stats = {};
  }

  apply(compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
      this.readyStyleFiles = {};
      this.stats = stats;
      const cachedStylesKeys = this.getCachedStyles();
      const sassFilesPaths =
        ThemesStylesCreatorPlugin.getSassFilesPathsFromCachedStylesKeys(cachedStylesKeys);
      this.deletedCachedStylesWithKeys(cachedStylesKeys);
      this.prepareThemesFilesWithCompiledStylesFiles(sassFilesPaths);
      this.createAndDropThemesFiles(this.stats.compilation.outputOptions.path);
    });
  }

  getCachedStyles() {
    if (
      ThemesStylesCreatorPlugin.cachedStylesKeys.length > 0
      && ThemesStylesCreatorPlugin.cachedStylesKeys[0]
    ) {
      return ThemesStylesCreatorPlugin.cachedStylesKeys;
    }
    ThemesStylesCreatorPlugin.consoleMessage('warn', `cachedKey "${ThemesStylesCreatorPlugin.cachedStylesKeys[0]}" wasn't got from prepared set!`);
    return this.getCachedStylesKeysFromStats();
  }

  prepareThemesFilesWithCompiledStylesFiles(sassFilePath) {
    sassFilePath.forEach((filePath) => {
      this.options.themes.forEach((theme) => {
        const { themeName, variables = {} } = theme;
        const sassCompiledResult = this.compileSassFile(filePath, variables);
        const compiledCssData =
          ThemesStylesCreatorPlugin.getCompiledCssWithPostCss(sassCompiledResult.css.toString());
        if (!this.readyStyleFiles[themeName]) {
          this.readyStyleFiles[themeName] = [];
        }
        this.readyStyleFiles[themeName].push(compiledCssData);
      });
    });
  }

  compileSassFile(sassFilePath, variables) {
    return sass.renderSync({
      data: ThemesStylesCreatorPlugin.createCompilerData(
        upath.normalize(sassFilePath),
        variables,
      ),
      outputStyle: this.stats.compilation.compiler.options.mode === 'production'
        ? 'compressed'
        : 'nested',
    });
  }

  getCachedStylesKeysFromStats() {
    return Object.keys(this.stats.compilation.cache).filter(cacheKey => cacheKey.indexOf('.scss') > -1);
  }

  deletedCachedStylesWithKeys(cachedStylesKeys) {
    cachedStylesKeys.forEach((cachedStylesKey) => {
      delete this.stats.compilation.cache[cachedStylesKey];
    });
    ThemesStylesCreatorPlugin.cachedStylesKeys = [];
  }

  createAndDropThemesFiles(buildFolder) {
    Object.keys(this.readyStyleFiles).forEach((themeName) => {
      fse.outputFileSync(`${buildFolder}${themeName}`, this.readyStyleFiles[themeName].join(''));
      ThemesStylesCreatorPlugin.consoleMessage('info', `${PLUGIN_NAME}: created theme "${themeName}"!`);
    });
  }
}

ThemesStylesCreatorPlugin.cachedStylesKeys = [];

module.exports = ThemesStylesCreatorPlugin;
