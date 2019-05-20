const defaultLocale = 'en';
const defaultTheme = 'white';

const getDefaultTheme = () => defaultTheme;
const getDefaultLocale = () => defaultLocale;

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

const getThemesWebpackConfig = (prefix, ext) => {
  const result = [];
  getAllowedThemes().forEach((themeName) => {
    result.push({
      fileName: `${prefix}.${themeName}.${ext}`,
      variables: {
        theme: themeName,
      },
    });
  });
  return result;
};

module.exports = {
  getDefaultTheme,
  getDefaultLocale,
  getAllowedThemes,
  getAllowedLocales,
  getThemesWebpackConfig,
};
