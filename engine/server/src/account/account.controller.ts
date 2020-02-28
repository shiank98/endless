import { Controller, Post, Body, HttpCode, UnauthorizedException, HttpStatus, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dtos/create.dto';
import { CheckAccountDTO } from './dtos/check.dto';
import { LoginAccountDTO } from './dtos/login.dto';

/**
 * Function used for sanitising strings for account functions.
 * @version 1.0.0
 * @param {string} str - the string to be sanitised.
 */ 
export const s: Function = (str: string) : string => {
  return str.toLowerCase().replace(/(\s|\t)*/g, '');
}

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
  async create(@Body() dto: CreateAccountDTO, @Res() res) : Promise<any> {

    // Get the account from the DB
    const account = await this.service.findOne({ accountName: s(dto.accountName) });

    const invalidInfo = (
      ! dto.accountName.match(/^\w+$/) ||
      dto.accountName.length > 40 ||
      dto.countyOrLocation.length > 40 ||
      dto.email.length > 40 ||
      dto.realName.length > 40
    ) ? true : false;

    // Invalid account info
    if (invalidInfo) {
      res.status(HttpStatus.I_AM_A_TEAPOT).send();
    }

    // The account name already exists
    else if (account) {
      res.status(HttpStatus.CONFLICT).send();
    } 
    
    // Create a new account
    else {
      await this.service.create(dto);
      res.status(HttpStatus.CREATED).send();
    }
  }
  
  /**
   * Used for checking requests for account creation.
   * @version 1.0.0
   * @param {CheckAccountDTO} dto - data transfer object containing account info.
   */
  @Post('check')
  async check(@Body() dto: CheckAccountDTO, @Res() res) : Promise<any> {

    // Get the account from the DB
    const accountName = await this.service.findOne({ accountName: s(dto.accountName) });
    const email = await this.service.findOne({ email: s(dto.email) });

    const invalidInfo = (
      ! dto.accountName.match(/^\w+$/) ||
      dto.accountName.length > 40 ||
      dto.email.length > 40
    ) ? true : false;

    // Invalid account info
    if (invalidInfo) {
      res.status(HttpStatus.I_AM_A_TEAPOT).send();
    }

    // The account name or email already exists
    else if (accountName || email) {
      res.status(HttpStatus.CONFLICT).send();
    } 
    
    // The account name and email are available
    else {
      res.status(HttpStatus.OK).send();
    }
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
    const authed = await this.service.validate({ 
      accountName: s(dto.accountName), 
      password: dto.password 
    });

    // They weren't authed
    if (! authed) {
      throw new UnauthorizedException();
    }

    // The request was valid so authenticate them
    return this.service.auth(dto);
  }
}
