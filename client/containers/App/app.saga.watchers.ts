import { History } from 'history';
import { CommonAction } from '../../../data/redux.interfaces';
import { ResponseData } from '../../../server/server';
import { AppReducerState } from '../../../data/redux.reducers';
import env from '../../../server/utils/Environment/bindings/withRoutes';
import { takeEvery, getContext, call, select } from 'redux-saga/effects';
import appEvents from './app.redux.events';
import { ChangeLocaleAction } from './app.redux.actions';
import { getTranslations as getTranslationsRequest }
  from '../../../data/translations/http';
import ClientTranslationsDto, { ClientTranslationsForLocale }
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import { default as appRoutes, ReactRoute } from './app.routes';
import ClientTranslator from '../../../data/translations/ClientTranslator/ClientTranslator';
import { TranslateHelper } from '../../../data/translations/trnaslations.interfaces';

function* getTranslations(locale: string) {
  try {
    const response: ResponseData = yield getTranslationsRequest(locale);
    return <ClientTranslationsForLocale>response.data;
  } catch (e) {
    throw e;
  }
}

function* changeLocaleForCurrentPage(locale: string, translations: ClientTranslationsForLocale) {
  const state: AppReducerState = yield select(s => s);
  const { pageName, params } = state.appReducer.route;
  const history: History = <History>state.appReducer.history;
  const url = yield call(env.createUrlByPageName, pageName, {
    ...params,
    locale,
  });
  yield call(history.push , url);
  const route: ReactRoute = appRoutes[pageName];
  const translator: ClientTranslator = yield new ClientTranslator(translations);
  const t: TranslateHelper = yield translator.getTranslator();
  (document.getElementById('title') as HTMLElement).innerHTML = t(route.meta.title);
}

function* changeLocale(action: CommonAction & ChangeLocaleAction) {
  const { locale } = action.payload;
  const translationsStorage: ClientTranslationsDto = yield getContext('translationsStorage');
  const isExistsTranslations: boolean = yield call(translationsStorage.isExistTranslations, locale);
  if (!isExistsTranslations) {
    const translations: ClientTranslationsForLocale = yield* getTranslations(locale);
    yield call(translationsStorage.setTranslations, locale, translations);
  }
  yield* changeLocaleForCurrentPage(locale, translationsStorage.getTranslations(locale));
}

function* watchChangeLocale() {
  yield takeEvery(appEvents.APP__CHANGE_LOCALE, changeLocale);
}

export default [
  watchChangeLocale(),
];
