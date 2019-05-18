import { CommonAction } from '../../../data/redux.interfaces';
// import { ResponseData } from '../../../server/server';
// import { AppReducerState } from '../../../data/redux.reducers';
// import env from '../../../server/utils/Environment/bindings/withRoutes';
// import { takeEvery, getContext, call, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import appEvents from './app.redux.events';
import { ChangeLocaleAction } from './app.redux.actions';
// import { getTranslations as getTranslationsRequest }
//   from '../../../data/translations/http';
// import ClientTranslationsDto, { ClientTranslationsForLocale }
//   from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
// import ClientTranslator from '../../../data/translations/ClientTranslator/ClientTranslator';
// import { TranslateHelper } from '../../../data/translations/trnaslations.interfaces';
// import routes, { ApplicationRoute } from '../Router/routes';
// import { STORAGE_NAME } from '../decorators/withTranslator';

// function* getTranslations(locale: string) {
//   try {
//     const response: ResponseData = yield getTranslationsRequest(locale);
//     return <ClientTranslationsForLocale>response.data;
//   } catch (e) {
//     throw e;
//   }
// }

// function* changeLocaleForCurrentPage(locale: string, translations: ClientTranslationsForLocale) {
//   yield;
  // const state: AppReducerState = yield select(s => s);
  // const { params, id } = state.appReducer.route;
  // const history: History = <History>state.appReducer.history;
  // const url = yield call(env.createUrlByRouteId, id, {
  //   ...params,
  //   locale,
  // });
  // yield call(history.push , url);
  // const route: ApplicationRoute = routes[id];
  // const translator: ClientTranslator = yield new ClientTranslator(translations);
  // const t: TranslateHelper = yield translator.getTranslator();
  // (document.getElementById('title') as HTMLElement).innerHTML = t(route.meta.title, 'meta');
// }

function* changeLocale(action: CommonAction & ChangeLocaleAction) {
  // const { locale } = action.payload;
  // const translationsStorage: ClientTranslationsDto = yield getContext(STORAGE_NAME);
  yield;
  // const state: AppReducerState = yield select(s => s);
  // const appLocale: string = state.appReducer.locale;
  // if (appLocale === locale) {
  //   return ;
  // }
  // console.log(appLocale === locale);
  // const translationsStorage: ClientTranslationsDto = yield getContext('translationsStorage');
  // const isExistsTranslations: boolean =
  // yield call(translationsStorage.isExistTranslations, locale);
  // if (!isExistsTranslations) {
  //   const translations: ClientTranslationsForLocale = yield* getTranslations(locale);
  //   yield call(translationsStorage.setTranslations, locale, translations);
  // }
  // yield* changeLocaleForCurrentPage(locale, translationsStorage.getTranslations(locale));
}

function* watchChangeLocale() {
  yield takeEvery(appEvents.APP__CHANGE_LOCALE, changeLocale);
}

export default [
  watchChangeLocale(),
];
