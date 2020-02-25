import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAccountDTO } from './dtos/create.dto';
import { LoginAccountDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

/**
 * The account type declaration.
 */
export type Account = any;

/**
 * The accounts service allows the application to interface with the database via injected models.
 * @version 1.0.0
 */
@Injectable()
export class AccountService {

  /**
   * Account service constructor.
   * @param {jwtService} JwtService - The JWT service to for authentication via Passport.
   * @version 1.0.0
   */
  constructor(
    @InjectModel('Account') private readonly model: Model<Account>,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Attempt to find an account in the database.
   * @param {object} query - The query to run.
   * @version 1.0.0
   */
  async findOne(query: object): Promise<any> {
    return await this.model.findOne(query);
  }

  /**
   * Create an account and save it to the database.
   * @version 1.0.0
   * @param {CreateAccountDTO} dto - data transfer object containing account info.
   */
  async create(dto: CreateAccountDTO) : Promise<any> {

    // Add one-way encryption to their password using bcrypt
    dto.password = bcrypt.hashSync(dto.password, bcrypt.genSaltSync());

    // Create the new account
    const account = await new this.model(dto).save();

    // Return the ID of the created account
    return account._id;
  }

  /**
   * Validates details for a login attempt.
   * @version 1.0.0
   */
  async validate(dto: LoginAccountDTO) {

    // Get the account from the database
    const account = await this.findOne({ accountName: dto.accountName });

    // If they exist return a validation result
    return account ? bcrypt.compareSync(dto.password, account.password) : false;
  }

  /**
   * Authentication function for validated login requests requiring a JWT access token.
   * @version 1.0.0
   * @param {Object} user - The input data provided by the authentication request.
   */
  async auth(dto: LoginAccountDTO) : Promise<any> {

    // Get the payload from the auth request
    const payload = { accountName: dto.accountName };

    // Return an access token
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
