/* eslint-disable no-console */
const PLUGIN_NAME = 'ServerFetchDataCreatorPlugin';
const upath = require('upath');
const { red, yellow } = require('chalk');
const madge = require('madge');
const fse = require('fs-extra');
const cachedFilesUrlsKeeper = require('./CachedFilesUrlsKeeper');

class ServerFetchDataCreatorPlugin {
  static consoleMessage(level, message) {
    if (level === 'error') {
      console.log(red(`======> ${level.toUpperCase()} ${PLUGIN_NAME}:`), message);
    } else {
      console.log(yellow(`======> ${level.toUpperCase()} ${PLUGIN_NAME}: ${message}`));
    }
  }

  constructor(options) {
    this.stats = {};
    this.options = options;
  }

  dropServerFetchJobsFile(urls) {
    const buildFolder = this.stats.compilation.outputOptions.path;
    const fileName = `${this.options.fileName}.json`;
    fse.outputFileSync(`${buildFolder}${fileName}`, JSON.stringify(urls));
    ServerFetchDataCreatorPlugin.consoleMessage('info', `created file for fetching server data: "${fileName}"!`);
  }

  static async buildDependencies(entry) {
    return madge(entry, {})
      .then(res => res);
  }

  async getPagesDependincies() {
    return Promise.all(
      this.options.pages.map(page => ServerFetchDataCreatorPlugin.buildDependencies(page)),
    );
  }

  getPageComponentsNames() {
    return this.options.pages.map(page => page.split('/').pop().split('.').shift());
  }

  static getServerFetchJobsObject(pageDependencies, pageComponentsNames) {
    const result = {};
    const urls = cachedFilesUrlsKeeper.getUrls();

    pageComponentsNames.forEach((pageComponentName, index) => {
      Object.keys(urls).forEach((url) => {
        const normalisedUrl = `../../${upath.normalize(url).split('/client/').pop()}`;
        if (pageDependencies[index].depends(normalisedUrl)[0]) {
          const pageName = pageComponentsNames[index];
          if (!result[pageName]) {
            result[pageName] = [];
          }
          result[pageName].push(upath.normalize(url).split('/client/').pop());
        }
      });
    });

    return result;
  }

  async buildServerFetchJobsObject() {
    return new Promise(async (res, rej) => {
      try {
        const pageDependencies = await this.getPagesDependincies();
        const pageComponentsNames = this.getPageComponentsNames();
        res(ServerFetchDataCreatorPlugin.getServerFetchJobsObject(
          pageDependencies,
          pageComponentsNames,
        ));
      } catch (e) {
        rej(e);
      }
    });
  }

  async apply(compiler) {
    compiler.hooks.done.tapAsync(PLUGIN_NAME, async (stats, callback) => {
      try {
        this.stats = stats;
        const res = await this.buildServerFetchJobsObject();
        this.dropServerFetchJobsFile(res);
      } catch (e) {
        ServerFetchDataCreatorPlugin.consoleMessage('error', e);
      }
      callback();
    });
  }
}

module.exports = ServerFetchDataCreatorPlugin;
