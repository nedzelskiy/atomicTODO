import {
  getDefaultTheme,
  getAllowedThemes,
  getDefaultLocale,
  getAllowedLocales,
} from '../../../config';

export default abstract class ApplicationConfig {
  static defaultTheme: string = getDefaultTheme();
  static defaultLocale: string = getDefaultLocale();
  static maxAgeForStatics: number = 60 * 60 * 24 * 31;

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
