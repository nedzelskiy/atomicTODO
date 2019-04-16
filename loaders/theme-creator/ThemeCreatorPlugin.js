const PLUGIN_NAME = 'ThemeCreatorPlugin';

const upath = require('upath');
const fse = require('fs-extra');
const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss/lib/postcss');

class ThemeCreatorPlugin {
    static getSassVariable(name, value) {
        return `$${name}: ${value};`;
    };
  
    static getSassImport(path) {
        return `@import "${path}";`;
    };
    
    static getSassVariables(variablesObj) {
      return Object.keys(variablesObj).map((name) => {
        return ThemeCreatorPlugin.getSassVariable(name, variablesObj[name]);
      }).join('\n');
    }
  
    static createCompilerData(sassEntry, sassVariables) {
        return ThemeCreatorPlugin.getSassVariables(sassVariables) + ThemeCreatorPlugin.getSassImport(sassEntry);
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
            const cachedStylesKeys = ThemeCreatorPlugin.cachedStylesKeys.length < 1
                ? this.getCachedStylesKeys()
                : ThemeCreatorPlugin.cachedStylesKeys;
            const sassFilesPaths = ThemeCreatorPlugin.getSassFilesPathsFromCachedStylesKeys(cachedStylesKeys);
            this.deletedCachedStylesWithKeys(cachedStylesKeys);
            this.prepareThemesFilesWithCompiledStylesFiles(sassFilesPaths);
            this.createAndDropThemesFiles(this.stats.compilation.outputOptions.path);
        });
    }
  
    prepareThemesFilesWithCompiledStylesFiles(sassFilePath) {
      sassFilePath.forEach(sassFilePath => {
        this.options.themes.forEach(theme => {
          const { themeName, variables = {}} = theme;
          const sassCompiledResult = this.compileSassFile(sassFilePath, variables);
          const compiledCssData = ThemeCreatorPlugin.getCompiledCssWithPostCss(sassCompiledResult.css.toString());
          if (!this.readyStyleFiles[themeName]) {
            this.readyStyleFiles[themeName] = [];
          }
          this.readyStyleFiles[themeName].push(compiledCssData);
        });
      });
    }
  
    compileSassFile(sassFilePath, variables) {
        return sass.renderSync({
            data: ThemeCreatorPlugin.createCompilerData(
                upath.normalize(sassFilePath),
                variables,
            ),
            outputStyle: this.stats.compilation.compiler.options.mode === 'production'
                ? 'compressed'
                : 'nested',
            });
    }
    
    getCachedStylesKeys() {
      return Object.keys(this.stats.compilation.cache).filter((cacheKey) => {
        return cacheKey.indexOf('.scss') > -1;
      });
    }
  
    deletedCachedStylesWithKeys(cachedStylesKeys) {
      cachedStylesKeys.forEach(cachedStylesKey => {
          delete this.stats.compilation.cache[cachedStylesKey];
      });
      ThemeCreatorPlugin.cachedStylesKeys = [];
    }
  
    createAndDropThemesFiles(buildFolder) {
        for (let themeName in this.readyStyleFiles) {
            fse.outputFileSync(`${buildFolder}${themeName}`, this.readyStyleFiles[themeName].join(''));
            console.log(`${PLUGIN_NAME}: created theme "${themeName}"!`);
        }
    }
}

ThemeCreatorPlugin.cachedStylesKeys = [];

module.exports = ThemeCreatorPlugin;
