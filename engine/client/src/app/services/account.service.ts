import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { env } from '../../environments/environment';


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
   */
  create(accountInfo: object) {
    return this.http.post(`${env.server}/account`, accountInfo).pipe().subscribe();
  }
}
