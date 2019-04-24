export class Environment {
  static defaultLanguage: string = 'en';

  static getAllowedLanguages(): Set<string> {
    return new Set()
      .add(Environment.defaultLanguage)
      .add('ru')
      .add('uk');
  }

  static getCheckedLanguage(lang: string): string {
    return Environment.getAllowedLanguages().has(lang)
      ? lang
      : Environment.defaultLanguage;
  }
}
