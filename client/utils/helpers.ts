export const getUrlWithOutLocale = (locale: string, url: string): string => {
  return url.replace(new RegExp(`^\\/${locale}\\/?`), '');
};
