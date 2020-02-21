import * as mongoose from 'mongoose';

/**
 * The user account schema is defined here.
 */
export const AccountSchema = new mongoose.Schema({
  accountName: String,
  password: String,
  realName: String,
  countyOrLocation: String,
  email: String
});
