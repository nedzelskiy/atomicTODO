const fse = require('fs-extra');
const config = require('../config');

const createStylesTag = (themeName) => (
  `<link rel="stylesheet" type="text/css" href="/storybook/storybook.${themeName}.css" />`
);

const stylesTag = createStylesTag(config.getDefaultTheme());

// fse.outputFileSync('./.storybook/preview-head.html', stylesTag);
