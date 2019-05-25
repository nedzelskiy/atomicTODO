/* eslint-disable no-console */
const PLUGIN_NAME = 'ThemesStylesCreatorPlugin';

const upath = require('upath');
const { red, yellow } = require('chalk');
const fse = require('fs-extra');
const uniqid = require('uniqid');
const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss/lib/postcss');
const cachedStylesKeysKeeper = require('./CachedStylesKeysKeeper');

class ThemesStylesCreatorPlugin {
  static getSassVariable(name, value) {
    return `$${name}: ${value};`;
  }

  static getSassImport(path) {
    return `@import "${path}";`;
  }

  static consoleMessage(level, message) {
    if (level === 'error') {
      console.log(red(`======> ${level.toUpperCase()} ${PLUGIN_NAME}:`), message);
    } else {
      console.log(yellow(`======> ${level.toUpperCase()} ${PLUGIN_NAME}: ${message}`));
    }
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
      try {
        this.readyStyleFiles = {};
        this.stats = stats;
        const cachedStylesKeys = this.getCachedStyles();
        const sassFilesPaths =
          ThemesStylesCreatorPlugin.getSassFilesPathsFromCachedStylesKeys(cachedStylesKeys);
        this.deletedCachedStylesWithKeys(cachedStylesKeys);
        this.prepareThemesFilesWithCompiledStylesFiles(sassFilesPaths);
        this.createAndDropThemesFiles();
        this.updateCompilationHash();
      } catch (e) {
        ThemesStylesCreatorPlugin.consoleMessage('error', e);
      }
    });
  }

  updateCompilationHash() {
    this.stats.compilation.hash = uniqid();
  }

  getCachedStyles() {
    const storedCachedKeys = cachedStylesKeysKeeper.getKeys();
    if (
      storedCachedKeys.length > 0
      && storedCachedKeys[0]
    ) {
      return storedCachedKeys;
    }
    ThemesStylesCreatorPlugin.consoleMessage(
      'warn',
      `cachedKey "${storedCachedKeys[0]}" wasn't got from prepared set!`,
    );
    return this.getCachedStylesKeysFromStats();
  }

  prepareThemesFilesWithCompiledStylesFiles(sassFilePath) {
    sassFilePath.forEach((filePath) => {
      this.options.themes.forEach((theme) => {
        const { fileName, variables = {} } = theme;
        const sassCompiledResult = this.compileSassFile(filePath, variables);
        const compiledCssData =
          ThemesStylesCreatorPlugin.getCompiledCssWithPostCss(sassCompiledResult.css.toString());
        if (!this.readyStyleFiles[fileName]) {
          this.readyStyleFiles[fileName] = [];
        }
        this.readyStyleFiles[fileName].push(compiledCssData);
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
    cachedStylesKeysKeeper.clearKeys();
  }

  createAndDropThemesFiles() {
    const buildFolder = this.options.output || this.stats.compilation.outputOptions.path;
    Object.keys(this.readyStyleFiles).forEach((themeName) => {
      fse.outputFileSync(`${buildFolder}${themeName}`, this.readyStyleFiles[themeName].join(''));
      ThemesStylesCreatorPlugin.consoleMessage('info', `created theme "${themeName}"!`);
    });
  }
}

module.exports = ThemesStylesCreatorPlugin;
