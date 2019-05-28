import { getRequest } from '../../client/utils/http';

export const getTranslations = (locale: string): Promise<void | object> => {
  return getRequest(`/translations/${locale}`);
};
