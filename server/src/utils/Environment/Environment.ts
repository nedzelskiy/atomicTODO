export default class Environment {
  static defaultLocale: string = 'en';

  static getAllowedLocales(): Set<string> {
    return new Set()
      .add(Environment.defaultLocale)
      .add('ru')
      .add('uk');
  }

  static getCheckedLocale(lang: string): string {
    return Environment.getAllowedLocales().has(lang)
      ? lang
      : Environment.defaultLocale;
  }
}
