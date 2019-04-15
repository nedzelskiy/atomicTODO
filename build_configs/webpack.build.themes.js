const fs = require('fs');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getScssLoaderRule = (themeName) => ({
    test: /\.scss$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        {
            loader: "sass-loader",
            options: {
                data: `$theme: ${themeName};`,
            }
        },
    ],
});

let scssRuleIndex;
let scssLoadersRules;
const readyFiles = [];
const webpackConfig = require('./webpack.client.config');

webpackConfig.module.rules.some((rule, index) => {
    if (rule.test.toString().indexOf('scss') > -1) {
        scssRuleIndex = index;
        return true;
    }
    return false;
});

function buildTheme(themeName, themeIndex) {
    webpackConfig.watch = false;
    if (!scssRuleIndex) {
        scssRuleIndex = webpackConfig.module.rules.length;
    }
    webpackConfig.module.rules[scssRuleIndex] = scssLoadersRules[themeIndex];
    if (webpackConfig.plugins) {
        webpackConfig.plugins = [
            ...webpackConfig.plugins,
            new MiniCssExtractPlugin({
                filename: `[name].${themeName}.css`,
            }),
        ];
    } else {
        webpackConfig.plugins = [
            new MiniCssExtractPlugin({
                filename: `[name].${themeName}.css`,
            }),
        ];
    }
    const compiler = webpack(webpackConfig);
    const mfs = new MemoryFS();
    const buildFolder = webpackConfig.output.path;
    compiler.outputFileSystem = mfs;

    compiler.run(function(err, stats) {
        if(stats.hasErrors()) { throw(stats.toString()); }
        mfs.readdirSync(buildFolder).forEach(function (f) {
            const fileExt = f.split('.').pop();
            if (fileExt === 'css' && !readyFiles[f]) {
                readyFiles.push({
                    filename: f,
                    content: mfs.readFileSync(buildFolder + f),
                });
            }
        });
        readyFiles.forEach(fileObj => {
            fs.writeFileSync(buildFolder + fileObj.filename, fileObj.content);
        });
    });
}

function buildThemes(themesNames = ['dark', 'white',]) {
    scssLoadersRules = themesNames.map(n => getScssLoaderRule(n));
    themesNames.forEach(buildTheme);
}

if (require.main === module) {
    buildThemes();
} else {
    module.exports = buildThemes;
}
