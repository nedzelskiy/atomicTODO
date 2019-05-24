import {
  getDefaultTheme,
  getAllowedThemes,
  getDefaultLocale,
  getAllowedLocales,
} from '../../../config';

export default abstract class ApplicationConfig {
  static defaultTheme: string = getDefaultTheme();
  static defaultLocale: string = getDefaultLocale();

  static getAllowedThemes(): Set<string> {
    return getAllowedThemes();
  }

  static getAllowedLocales(): Set<string> {
    return getAllowedLocales();
  }

  static getCheckedLocale(locale: string): string {
    return ApplicationConfig.isAcceptedLocale(locale)
      ? locale
      : ApplicationConfig.defaultLocale;
  }

  static isAcceptedLocale(locale: string): boolean {
    return ApplicationConfig.getAllowedLocales().has(locale);
  }

  abstract getLocale(): string;
}
