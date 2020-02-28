import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('app')
export class AppController {

  /**
   * App controller constructor.
   * @version 1.0.0
   */
  constructor() {}
  
  /**
   * Used for accepting requests for account creation.
   * @version 1.0.0
   * @param {CreateAccountDTO} dto - data transfer object containing account info.
   */
  @Get('ping')
  @HttpCode(202)
  async ping() {}
}
