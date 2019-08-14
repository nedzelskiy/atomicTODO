/* eslint-disable no-console */
const fs = require('fs');
const upath = require('upath');
const loaderUtils = require('loader-utils');

module.exports = function graphqlStringBuilder(content) {
  let str = content;
  try {
    const fragmentsMatch = str.match(/\.\.\.\s?([a-zA-Z]+)/g);
    if (fragmentsMatch) {
      fragmentsMatch.map(match => match.replace(/[.\s]+/, '').toLowerCase()).forEach((fragmentName) => {
        const fragmentsPathObj = str.match(/fragmentsPath:(.+)/);
        const u = loaderUtils.getRemainingRequest(this).toString().split('!').pop();
        const pathObj = upath.parse(u);
        let path = `${pathObj.dir}/${fragmentName}${pathObj.ext}`;
        if (fragmentsPathObj) {
          const dir = upath.resolve(pathObj.dir, fragmentsPathObj[1]);
          path = `${dir}/${fragmentName}${pathObj.ext}`;
        }
        const fileContent = fs.readFileSync(
          upath.normalize(path),
          'utf-8',
        );
        str = `${str} ${fileContent}`;
      });
    }
  } catch (e) {
    console.log('graphqlStringBuilder ERROR', e, JSON.stringify(e, null, 4));
  }
  return str;
};
