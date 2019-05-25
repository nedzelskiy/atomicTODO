import { CommonAction } from '../../../data/redux.interfaces';
import { takeEvery, getContext, call, put } from 'redux-saga/effects';
import appEvents from './app.redux.events';
import { ChangeLocaleAction, setLocale, stopLoading } from './app.redux.actions';
import { getTranslations } from '../../../data/translations/http';
import ClientTranslationsDto
  from '../../../data/translations/ClientTranslationsDto/ClientTranslationsDto';
import { STORAGE_NAME } from '../decorators/withTranslator';
import { ResponseData } from '../../../server/interfaces';

function* changeLocale(action: CommonAction & ChangeLocaleAction) {
  try {
    const { locale } = action.payload;
    const translationsStorage: ClientTranslationsDto = yield getContext(STORAGE_NAME);
    const response: ResponseData = yield getTranslations(locale);
    if (!response.success) {
      throw response.error;
    }
    yield call(translationsStorage.setTranslations, locale, response.data);
    yield put(setLocale(locale));
    yield put(stopLoading());
  } catch (e) {
    throw e;
  }
}

function* watchChangeLocale() {
  yield takeEvery(appEvents.APP__CHANGE_LOCALE, changeLocale);
}

export default [
  watchChangeLocale(),
];
