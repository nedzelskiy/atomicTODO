/* eslint-disable no-console */
const PLUGIN_NAME = 'ServerFetchDataCreator';
const chalk = require('chalk');
const fse = require('fs-extra');
const madge = require('madge');
// const jsonCircular = require('json-circular');
const cachedFilesUrlsKeeper = require('./CachedFilesUrlsKeeper');

class ServerFetchDataCreator {
  static consoleMessage(level, message) {
    if (level === 'error') {
      console.log(chalk.red(`======> ${level.toUpperCase()} ${PLUGIN_NAME}:`), message);
    } else {
      console.log(chalk.blue(`======> ${level.toUpperCase()} ${PLUGIN_NAME}: ${message}`));
    }
  }

  constructor(options) {
    this.stats = {};
    this.options = options;
  }

  dropServerFetchJobsFile(urls) {
    const buildFolder = this.stats.compilation.outputOptions.path;
    const { fileName } = this.options;
    fse.outputFileSync(`${buildFolder}${fileName}.js`, `module.exports = ${JSON.stringify(urls)};`);
    ServerFetchDataCreator.consoleMessage('info', `${PLUGIN_NAME}: created file for fetching server data: "${fileName}"!`);
  }

  apply(compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
      try {
        let i = 0;
        stats.toJson({ modules: true }).modules.forEach((module) => {
          i++;
          if (
            module.id.toString().indexOf('Button.tsx') > -1
          ){
            const text = JSON.stringify(module, null, 4);
            console.log('==========================================', i);
            require('fs').writeFileSync(`11${i}.txt`, JSON.stringify(module, null, 4));
          }
        });

    //     // madge('../../client/client').then((res) => {
    //     //   console.log(res.warnings());
    //     //   console.log(res.obj());
    //     // });
    //     this.stats = stats;
    //     const urls = cachedFilesUrlsKeeper.getUrls();
    //     this.dropServerFetchJobsFile(urls);
      } catch (e) {
        ServerFetchDataCreator.consoleMessage('error', e);
      }
    });

    // compiler.hooks.compilation.hooks.buildModule.tap('MyPlugin', (module) => {
    //   console.log(module);
    // });
  }
}

module.exports = ServerFetchDataCreator;
