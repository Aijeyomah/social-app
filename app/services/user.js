import authQueries from '../db/queries/auth';
import db from '../db';
import {  DBError, constants } from '../utils';


const {getUserByEmailOrPhoneNumber, getUserById} = authQueries;

  /**
   * Fetches a user by his/her email.
   * @memberof UserService
   * @param { String } field - The email address or phone number of the user.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
   */
 export const  fetchByEmailOrPhoneNumber = async(field) => {
    return db.oneOrNone(getUserByEmailOrPhoneNumber, [field]);
  }

  /**
   * Fetches a user by his/her id.
   * @memberof userService
   * @param { String } id - The id of the user.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
   */
  export const  fetchByUserId = async(id) => db.oneOrNone(getUserById, [id]);
  

  