/* eslint-disable no-console */
const PLUGIN_NAME = 'AssetsHashGetterPlugin';

const md5 = require('md5');
const upath = require('upath');
const fse = require('fs-extra');
const { readFileSync } = require('fs');
const { red, green } = require('chalk');

class AssetsHashGetterPlugin {
  static consoleMessage(level, message) {
    if (level === 'error') {
      console.log(red(`======> ${level.toUpperCase()} ${PLUGIN_NAME}:`), message);
    } else {
      console.log(green(`======> ${level.toUpperCase()} ${PLUGIN_NAME}: ${message}`));
    }
  }

  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
      try {
        const manifest = {};
        const buildFolder = stats.compilation.outputOptions.path;
        Object.keys(stats.compilation.assets).forEach((assetName) => {
          const u = upath.normalize(`${buildFolder}${assetName}`);
          manifest[assetName] = md5(readFileSync(u, 'utf-8'));
        });
        const fileName = `${this.options.fileName}.json`;
        fse.outputFileSync(
          `${buildFolder}${fileName}`,
          JSON.stringify(
            Object.assign({}, manifest, this.options.additionalHashes || {}),
          ),
        );
        AssetsHashGetterPlugin.consoleMessage('info', `created file: "${fileName}"!`);
      } catch (e) {
        AssetsHashGetterPlugin.consoleMessage('error', e);
      }
    });
  }
}

module.exports = AssetsHashGetterPlugin;
