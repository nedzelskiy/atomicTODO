import ApplicationConfig from '../../../server/utils/ApplicationConfig/ApplicationConfig';
import { AppCookieInterface } from '../ApplicationCookie/ApplicationCookie';

class ClientEnvironment extends ApplicationConfig {
  private readonly cookieConnector: AppCookieInterface;

  constructor(cookieConnector: AppCookieInterface) {
    super();
    this.cookieConnector = cookieConnector;
  }

  getLocale(): string {
    return ClientEnvironment.getCheckedLocale(this.cookieConnector.getLocaleCookie());
  }

  getCookieConnector(): AppCookieInterface {
    return this.cookieConnector;
  }
}

export default ClientEnvironment;
