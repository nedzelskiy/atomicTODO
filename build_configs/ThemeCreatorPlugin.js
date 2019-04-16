const PLUGIN_NAME = 'ThemeCreatorPlugin';

module.exports = class ThemeCreatorPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
            Object.keys(stats.compilation.cache).filter((resourceName, index) => {
                if (resourceName.indexOf('.scss') > -1) {
                    delete stats.compilation.cache[resourceName];
                    return true;
                }
                return false;
            }).map(sassFileRemainingRequest => {
                return sassFileRemainingRequest.split('!').pop();
            }).forEach(sassFileName => {
                this.options.themes.forEach(theme => {
                    const { filename, variables = {}} = theme;
                });
            });
        });
    }
};
