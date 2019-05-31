import appEvents from './app.redux.events';
import { ResponseData } from '../../../server/interfaces';
import { STORAGE_NAME } from '../decorators/withTranslator';
import { CommonAction } from '../../../data/redux.interfaces';
import { AppReducerState } from '../../../data/redux.reducers';
import { getTranslations } from '../../../data/translations/http';
import { takeEvery, getContext, call, put, select } from 'redux-saga/effects';
import ClientTranslationsDto
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import {
  setLocale,
  stopLoading,
  startLoading,
  setPageError,
  GetLocaleAction,
} from './app.redux.actions';

function* getLocale(action: CommonAction & GetLocaleAction) {
  const { locale } = action.payload;
  const state: AppReducerState = yield select(s => s);
  const id = `get-locale-${locale}`;
  try {
    if (state.appReducer.loading[id]) {
      return;
    }
    yield put(startLoading(id));
    const response: ResponseData = yield getTranslations(locale);
    if (!response.success) {
      throw response.error;
    }
    const translationsStorage: ClientTranslationsDto = yield getContext(STORAGE_NAME);
    yield call(translationsStorage.setTranslations, locale, response.data);
    yield put(setLocale(locale));
    yield put(stopLoading(id));
  } catch (e) {
    const message = e.response && e.response.data && e.response.data.error
      ? e.response.data.error.toString()
      : e.response.statusText;
    const code = e.response && e.response.status
      ? e.response.status
      : null;
    yield put(setPageError({
      code,
      message,
      isError: true,
    }));
    yield put(stopLoading(id));
    throw e;
  }
}

function* watchGetLocale() {
  yield takeEvery(appEvents.APP__GET_LOCALE, getLocale);
}

export default [
  watchGetLocale(),
];
