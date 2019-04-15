'use strict';

const upath = require('upath');
const fse = require('fs-extra');
const sass = require('node-sass');
const loaderName = 'theme-creator';
const loaderUtils = require('loader-utils');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss/lib/postcss');

const createError = (message) => {
    return new Error(`Webpack loader "${loaderName}" error: ${message}`);
};

const getSassVariable = (name, value) => {
    return `$${name}: ${value};`;
};

const getSassVariables = (variablesObj) => {
    return Object.keys(variablesObj).map(function (name) {
        return getSassVariable(name, variablesObj[name]);
    }).join('\n')
};

const getSassImport = (path) => {
    return `@import "${path}";`;
};

const createCompilerData = (sassEntry, sassVariables) => {
    return getSassVariables(sassVariables) + getSassImport(sassEntry);
};

const readyFiles = {};

const themeCreatorLoader = function() {
    this.cacheable && this.cacheable();
    const options = loaderUtils.getOptions(this);
    const { themes = [] } = options;
    if (themes.length < 1) {
        throw createError('Missing options themes in loader!');
    }
    if (!themes[0].filename) {
        throw createError('Missing filename attribute in theme object!');
    }
    themes.forEach((theme) => {
        const { filename, variables = {} } = theme;
        const sassFilePath = loaderUtils.getRemainingRequest(this);
        const result = sass.renderSync({
            data: createCompilerData(
                upath.normalize(sassFilePath),
                variables,
            ),
            outputStyle: this._compiler.options.mode === 'production' ? 'compressed' : 'nested',
        });
        if (!readyFiles[filename]) {
            readyFiles[filename] = {};
        }
        readyFiles[filename][sassFilePath] = postcss([autoprefixer]).process(result.css.toString()).css;
    });
    return '';
};

themeCreatorLoader.plugin = class ThemeCreatorPlugin {
    apply(compiler) {
        compiler.hooks.done.tap(loaderName, (stats) => {
            const buildFolder = stats.compilation.outputOptions.path;
            for (let filename in readyFiles) {
                fse.outputFileSync(`${buildFolder}${filename}`, Object.values(readyFiles[filename]).join(''));
            }
        });
    }
};

module.exports = themeCreatorLoader;

