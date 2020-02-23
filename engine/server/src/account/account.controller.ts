import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './account.dto';

/**
 * This controller handles the accounts alongside it's service and module.
 * @version 1.0.0
 */
@Controller('account')
export class AccountController {

  /**
   * Account controller constructor.
   * @version 1.0.0
   * @param {AccountService} accountService - Account service interfacing the database
   */
  constructor(
    private readonly accountService: AccountService
  ) {}
  
  /**
   * Used for accepting requests for account creation
   * @param {CreateAccountDTO} dto - data transfer object containing account info
   */
  @Post()
  @HttpCode(201)
  async createAccount(@Body() dto: CreateAccountDTO) {
    return await this.accountService.create(dto);
  }
}
