export interface LocalizedTranslationsFormat {
  isExistTranslations(locale: string): boolean;
  getTranslations(locale: string): any | null;
  setTranslations(locale: string, translationsForLocale: any): void;
}

export type TranslateHelper = (id: string, domain?: string) => string;
