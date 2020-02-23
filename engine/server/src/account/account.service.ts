import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAccountDTO } from './account.dto';

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
   * @version 1.0.0
   */
  constructor(
    @InjectModel('Account') private readonly model: Model<Account>
  ) {}

  /**
   * Create an account and save it to the database.
   * @version 1.0.0
   * @param {Object} data - The data for the account being created.
   */
  async create(dto: CreateAccountDTO) {
    return await new this.model(dto).save();
  }
}
