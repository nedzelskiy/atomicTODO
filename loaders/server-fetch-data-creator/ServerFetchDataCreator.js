/* eslint-disable no-console */
const PLUGIN_NAME = 'ServerFetchDataCreator';
const chalk = require('chalk');
const madge = require('madge');
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
    fse.outputFileSync(`${buildFolder}${fileName}.js`, `module.exports = ${JSON.stringify(urls)};`);
    ServerFetchDataCreator.consoleMessage('info', `${PLUGIN_NAME}: created file for fetching server data: "${fileName}"!`);
  }

  static async buildDependencies(entry) {
    return madge(entry, {})
      .then(res => res);
  }

  async buildServerFetchJobsObject() {
    const result = {};
    const urls = cachedFilesUrlsKeeper.getUrls();
    return new Promise(async (res, rej) => {
      try {
        for (const page of this.options.pages) {
          const pageComponentName = page.split('/').pop().split('.').shift();
          const dependencies = await ServerFetchDataCreator.buildDependencies(page);
          for (const url of Object.keys(urls)) {
            const normalisedUrl = `../../${url.split('/client/').pop()}`;
            if (dependencies.depends(normalisedUrl)[0]) {
              if (!result[pageComponentName]) {
                result[pageComponentName] = [];
              }
              result[pageComponentName].push(url.split('/client/').pop());
            }
          }
        }
        res(result);
      } catch (e) {
        rej(e);
      }
    });
  }

  async apply(compiler) {
    compiler.hooks.done.tapAsync(PLUGIN_NAME, async (stats, callback)  => {
      try {
        this.stats = stats;
        const res = await this.buildServerFetchJobsObject();
        this.dropServerFetchJobsFile(res);
      } catch (e) {
        ServerFetchDataCreator.consoleMessage('error', e);
      }
      callback();
    });
  }
}

module.exports = ServerFetchDataCreator;
