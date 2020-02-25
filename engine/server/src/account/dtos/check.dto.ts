/**
 * This is the data transfer object required to check email and account name availability.
 */
export class CheckAccountDTO {

  /**
   * The account name.
   */
  accountName: string;

  /**
   * The account email address.
   */
  email: string;
};
