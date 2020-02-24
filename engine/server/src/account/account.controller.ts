import { Controller, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dtos/create.dto';
import { LoginAccountDTO } from './dtos/login.dto';

/**
 * This controller handles the accounts alongside it's service and module.
 * @version 1.0.0
 */
@Controller('account')
export class AccountController {

  /**
   * Account controller constructor.
   * @version 1.0.0
   * @param {AccountService} service - Account service interfacing the database.
   */
  constructor(
    private readonly service: AccountService
  ) {}
  
  /**
   * Used for accepting requests for account creation.
   * @version 1.0.0
   * @param {CreateAccountDTO} dto - data transfer object containing account info.
   */
  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateAccountDTO) : Promise<any> {

    // Return the ID of the account having awaited it's creation
    return await this.service.create(dto);
  }

  /**
   * Used for authenticating login requests.
   * @version 1.0.0
   * @param {Request} req - the request data from the POST.
   */ 
  @Post('login')
  @HttpCode(201)
  async login(@Body() dto: LoginAccountDTO) : Promise<any> {

    // Validate the login details received
    const authed = await this.service.validate(dto);

    // They weren't authed
    if (! authed) {
      throw new UnauthorizedException();
    }

    // The request was valid so authenticate them
    return this.service.auth(dto);
  }
}
