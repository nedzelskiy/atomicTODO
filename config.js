const defaultLocale = 'en';
const defaultTheme = 'white';
const fileNameOfNeededInServerData = 'inDataNeeded';

const getDefaultTheme = () => defaultTheme;
const getDefaultLocale = () => defaultLocale;
const getFileNameOfNeededInServerData = () => fileNameOfNeededInServerData;

const getAllowedThemes = () => (
  new Set()
    .add(getDefaultTheme())
    .add('dark')
    .add('white')
);

const getAllowedLocales = () => (
  new Set()
    .add(getDefaultLocale())
    .add('en')
    .add('ru')
    .add('zh')
    .add('fi-FI')
);

const getThemeFileName = (prefix, themeName, ext = 'css') => `${prefix}.${themeName}.${ext}`;

const getThemesWebpackConfig = (prefix, ext = 'css') => {
  const result = [];
  getAllowedThemes().forEach((themeName) => {
    result.push({
      fileName: getThemeFileName(prefix, themeName, ext),
      variables: {
        theme: themeName,
      },
    });
  });
  return result;
};

module.exports = {
  getDefaultTheme,
  getThemeFileName,
  getDefaultLocale,
  getAllowedThemes,
  getAllowedLocales,
  getThemesWebpackConfig,
  getFileNameOfNeededInServerData,
};
