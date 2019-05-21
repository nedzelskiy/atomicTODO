const fse = require('fs-extra');
const config = require('../config');

export const stylesTagID = 'storybook';

const createStylesTag = (themeName) => (
  `<link rel="stylesheet" type="text/css" href="/storybook/storybook.${themeName}.css" id="${stylesTagID}" />`
);

const stylesTag = createStylesTag(config.getDefaultTheme());

fse.outputFileSync('./.storybook/preview-head.html', stylesTag);
