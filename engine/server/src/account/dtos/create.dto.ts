/**
 * This is the data transfer object required to create accounts.
 */
export class CreateAccountDTO {

  /**
   * The account name.
   */
  accountName: string;

  /**
   * The account password.
   */
  password: string;

  /**
   * The real name of the account's user.
   */
  realName: string;

  /**
   * The county or location of the account's user.
   */
  countyOrLocation: string;

  /**
   * The account email address.
   */
  email: string;
};
