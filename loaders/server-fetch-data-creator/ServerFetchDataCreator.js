/* eslint-disable no-console */
const PLUGIN_NAME = 'ServerFetchDataCreator';
const chalk = require('chalk');
const fse = require('fs-extra');
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
    fse.outputFileSync(`${buildFolder}${fileName}.json`, JSON.stringify(urls));
    ServerFetchDataCreator.consoleMessage('info', `${PLUGIN_NAME}: created file for fetching server data: "${fileName}"!`);
  }

  apply(compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
      try {
        this.stats = stats;
        const urls = cachedFilesUrlsKeeper.getUrls();
        this.dropServerFetchJobsFile(urls);
      } catch (e) {
        ServerFetchDataCreator.consoleMessage('error', e);
      }
    });
  }
}

module.exports = ServerFetchDataCreator;
