/* eslint-disable no-console */
const PLUGIN_NAME = 'AssetsHashGetterPlugin';

const fse = require('fs-extra');
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
        stats.compilation.chunks.forEach((chunk) => {
          const assetName = chunk.name.split('/').pop();
          manifest[assetName] = chunk.contentHash.javascript;
        });
        const buildFolder = stats.compilation.outputOptions.path;
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
