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

let readyFiles = {};

const themeCreatorLoader = function() {
    // console.log('```````` start loader')
    // this.cacheable && this.cacheable();
    const options = loaderUtils.getOptions(this);
    const { themes = [] } = options;
    if (themes.length < 1) {
        throw createError('Missing options themes in loader!');
    }
    if (!themes[0].filename) {
        throw createError('Missing filename attribute in theme object!');
    }
    themes.forEach((theme) => {
        // console.log('readyFiles', readyFiles);
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
    // console.log('```````` end loader');
    return `${Math.random()}`;
};

function censor(censor) {
    var i = 0;

    return function(key, value) {
        if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value)
            return '[Circular]';

        if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
            return '[Unknown]';

        ++i; // so we know we aren't using the original object anymore

        return value;
    }
}

themeCreatorLoader.plugin = class ThemeCreatorPlugin {
    apply(compiler) {
        compiler.hooks.done.tap(loaderName, (stats) => {
            Object.keys(stats.compilation.cache).filter((resourceName, index) => {
                if (resourceName.indexOf('.scss') > -1) {
                    delete stats.compilation.cache[resourceName];
                    return true;
                }
                return false;
            }).forEach(sassFileRemainingRequest => {
                const sassFilePath = sassFileRemainingRequest.split('!').pop();
                console.log(sassFilePath);
            });
        });
        // compiler.hooks.afterCompile.tap(loaderName, (compiler) => {
        //     // compilation.hooks.finishModules.tap('loaderName', modules => {
        //     console.log('1')
        //     try{
        //             require('fs').writeFileSync(`test.json`,
        //                 require('circular-json').stringify(compiler, null, 4));
        //
        //         } catch (e) {
        //             console.log('error', e)
        //         }
        //     console.log('2')
            // })


            // stats.compilation.cache[Object.keys(stats.compilation.cache)[0]].dependencies.forEach(cacheDependency => {
            //     cacheDependency.module
            // });

            // Object.keys(stats.compilation.cache).filter(resourceName => {
            //     return resourceName.indexOf('.scss') > -1;
            // }).forEach(sassFileRemainingRequest => {
            //     const sassFilePath = sassFileRemainingRequest.split('!').pop();
            //     console.log(sassFilePath);
            // });

        // });
    }
};

module.exports = themeCreatorLoader;

