import { browser, by, element } from 'protractor';

/**
 * App Page Class
 */
export class AppPage {

  /**
   * Function used for navigation
   */
  navigateTo() : Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  /**
   * Function used to retrieve title text
   */
  getTitleText() : Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
