import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { env } from '../../environments/environment';

/**
 * The account service used for interacting with the server.
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /**
   * The JWT access token is used for authenticating requests with the server.
   */
  public accessToken: any = null;

  /**
   * The account service constructor.
   * @param {HttpClient} http - The HTTP client is used for making requests to the server.
   */
  constructor(
    public http: HttpClient
  ) {}

  /**
   * This function sends account info to the server requesting to create an account.
   * @param {object} accountInfo - The account information provided by the user to be sent.
   * @param {Function} onError - The callback function for when an error occurs.
   */
  create(accountInfo: object, onError: Function) {

    // Send a create account POST request to the server
    return this.http.post(`${env.server}/account`, accountInfo).pipe(
      
      // The account name already exists in the DB
      catchError(() => {

        // Fire the error callback function
        onError();

        // Throw the error
        return throwError(new Error('Account name is already in use.'))
      })
    );
  }

  /**
   * This function stores the JWT access token used for authenticating requests with the server.
   * @param {string} accessToken - The access token we're storing.
   */
  setToken(accessToken: string) : void {
    this.accessToken = accessToken;
  }

  /**
   * This function retrieves the stored JWT access token used for authenticating requests with the server.
   */
  getToken() : string | null {
    return this.accessToken;
  }

  /**
   * This function logs out clearing the stored JWT access token.
   */
  logout() : void {
    this.setToken(null);
  }

  /**
   * This function checks if the user is authenticated having a JWT access token stored.
   */
  isAuthed() : boolean {
    return this.getToken() ? true : false;
  }

  /**
   * This function sends account info to the server to check account name and email availability.
   * @param {object} accountInfo - The account information provided by the user to be sent.
   * @param {Function} onError - The callback function for when an error occurs.
   */
  check(accountInfo: object, onError: Function) {

    // Send a create account POST request to the server
    return this.http.post(`${env.server}/account/check`, accountInfo).pipe(
      
      // The account name already exists in the DB
      catchError(() => {

        // Fire the error callback function
        onError();

        // Throw the error
        return throwError(new Error('Account name or email is already in use.'))
      })
    );
  }

  /**
   * This function sends account info to the server in order to login.
   * @param {object} loginInfo - The login information provided by the user to be sent.
   * @param {Function} onError - The callback function for when an error occurs.
   */
  login(loginInfo: object, onError: Function) {

    // Send a create login POST request to the server
    return this.http.post(`${env.server}/account/login`, loginInfo).pipe(
      
      // The account name already exists in the DB
      catchError(() => {

        // Fire the error callback function
        onError();

        // Throw the error
        return throwError(new Error('The account or password you provided could not be found in our database.'))
      })
    );
  }
}
