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
   * The account service constructor.
   * @param {HttpClient} http - The HTTP client is used for making requests to the server.
   */
  constructor(
    private http: HttpClient
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
}
