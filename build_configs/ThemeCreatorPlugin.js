const PLUGIN_NAME = 'ThemeCreatorPlugin';

const upath = require('upath');
const fse = require('fs-extra');
const sass = require('node-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss/lib/postcss');

module.exports = class ThemeCreatorPlugin {
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
  
    constructor(options) {
        this.readyFiles = {};
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
            this.readyFiles = {};
            Object.keys(stats.compilation.cache).filter((resourceName) => {
                if (resourceName.indexOf('.scss') > -1) {
                    delete stats.compilation.cache[resourceName];
                    return true;
                }
                return false;
            }).map(sassFileRemainingRequest => {
                return sassFileRemainingRequest.split('!').pop();
            }).forEach(sassFilePath => {
                this.options.themes.forEach(theme => {
                    const { themeName, variables = {}} = theme;
                    const result = sass.renderSync({
                        data: ThemeCreatorPlugin.createCompilerData(
                            upath.normalize(sassFilePath),
                            variables,
                        ),
                        outputStyle: stats.compilation.compiler.options.mode === 'production'
                          ? 'compressed'
                          : 'nested',
                    });
                    if (!this.readyFiles[themeName]) {
                      this.readyFiles[themeName] = [];
                    }
                    this.readyFiles[themeName].push(postcss([autoprefixer]).process(result.css.toString()).css);
                });
            });
            this.createThemesFiles(stats.compilation.outputOptions.path);
        });
    }
  
    createThemesFiles(buildFolder) {
        for (let themeName in this.readyFiles) {
            fse.outputFileSync(`${buildFolder}${themeName}`, this.readyFiles[themeName].join(''));
            console.log(`${PLUGIN_NAME}: created theme "${themeName}"!`);
        }
    }
};
