import { sha256 } from 'js-sha256';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import genericError from './error/generic';
import config from '../../config/env';
import constants from './constants';
import db from '../db';

const { SECRET } = config;
const { serverError } = genericError;
const { SUCCESS_RESPONSE, FAIL, SUCCESS, DEFAULT_ERROR_MSG ,INTERNAL_SERVER_ERROR, ROLE_NOT_SUFFICIENT} = constants;



/**
 * @param { string } prefix - a value to appended tp the generated string
 * @returns {string} - a unique identification number
 */
  export const generateUniqueId = (i) => {
    return `${i}-${Math.random().toString(32).substr(2, 5)}`;
  };


  /**
 * regenerate id if it already exist in the db
 *  @param { string } prefix - a value to appended tp the generated string
 *  @param { string } query - a query to fetch data from the db
 * @returns {string} - a unique identification string
 */
  export const regenerateUniqueId = async(i, query) => {
    const id = generateUniqueId(i);
    const existId = await db.oneOrNone(query, [ id ]);
    if (!existId) {
      return id;
    }
    regenerateUniqueId(i, query);
  }

  /**
  * This is used for generating a hash and a salt from a user's password.
  * @static
  * @param {string} plainPassword - password to be encrypted.
  * @memberof Helper
  * @returns {Object} - An object containing the hash and salt of a password.
  */
  export const hashPassword = async(plainPassword) => {
    const salt = bcrypt.genSaltSync(10);
    return {
      salt,
      hash: generateHash(salt, plainPassword)
    };
  }

  /**
  * This generates a hash.
  * @static
  * @param {String} salt - A random string.
  * @param {String} plain - A users' plain password or some sensitive data to be hashed.
  * @memberof Helper
  * @returns {String} - A hexadecimal string which is the hash value of
  * the plain text passed as the second positional argument.
  */
  export const generateHash = (salt, plain) => {
    const hash = sha256.hmac.create(salt);
    hash.update(plain);
    return hash.hex();
  };

  /**
  * This checks if a plain text matches a certain hash value by generating
  * a new hash with the salt used to create that hash.
  * @static
  * @param {string} plain - plain text to be used in the comparison.
  * @param {string} hash - hashed value created with the salt.
  * @param {string} salt - original salt value.
  * @memberof Helper
  * @returns {boolean} - returns a true or false, depending on the outcome of the comparison.
  */
  export const compareHash = (plain, hash, salt) => {
    const hashMatch = generateHash(salt, plain);
    return hash === hashMatch;
  }

  /**
   * Synchronously signs the given payload into a JSON Web Token string.
   * @static
   * @param {string | number | Buffer | object} payload - payload to sign
   * @param {string | number} expiresIn - Expressed in seconds or a string describing a
   * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 2 hours.
   * @memberof Helper
   * @returns {string} - JWT Token
   */
  export const generateToken = (payload, expiresIn = '2h') => {
    return jwt.sign(payload, SECRET, { expiresIn });
  }

  /**
   * This verify the JWT token with the secret with which the token was issued with
   * @static
   * @param {string} token - JWT Token
   * @memberof Helper
   * @returns {string | number | Buffer | object } - Decoded JWT payload if
   * token is valid or an error message if otherwise.
   */
  export const  verifyToken = async(token) => {
    return jwt.verify(token, SECRET);
  }

  /**
   * Adds jwt token to object.
   * @static
   * @param { Object } user - New User Instance.
   * @param { Boolean } is_admin - A boolean that helps determine whether the user is an admin.
   * @memberof Helpers
   * @returns {object } - A new object containing essential user properties and jwt token.
   */
  export const  addTokenToData = (user) => {
    const { id, is_active, role, email, first_name, } = user;
    const token = generateToken({
      id,
      is_active,
      email,
      role,
      first_name
    });
    return {
      id,
      first_name,
      last_name: user.last_name,
      nick_name: user.nick_name,
      is_active,
      role,
      email,
      token,
    };
  }

  const socialMediaAuth = async(request) => {
    const token = await hash.generateToken(request.user.first_name, request.user.email);
    return token;
};

  /**
   * Generates a JSON response for success scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} options - An object containing response properties.
   * @param {object} options.data - The payload.
   * @param {string} options.message -  HTTP Status code.
   * @param {number} options.code -  HTTP Status code.
   * @memberof Helpers
   * @returns {JSON} - A JSON success response.
   */
  export const successResponse = (
    res,
    { data, message = SUCCESS_RESPONSE, code = 200 }
  )  => {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data,
    });
  }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof Helpers
   * @returns { Null } -  It returns null.
   */
  export const apiErrLogMessenger =(error, req) =>{
    logger.error(
      `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof Helpers
   * @returns { Null } -  It returns null.
   */
//  export const moduleErrLogMessager =(error) => {
//     logger.error(`${error.status} - ${error.name} - ${error.message} - ${error.stack}`);
//   }
  export const moduleErrLogMessager = (error, status, message) => logger.error(`${status} - ${error.name} - ${error.message} - ${message}`);

  /**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {object} error - The error object.
   * @param {number} error.status -  HTTP Status code, default is 500.
   * @param {string} error.message -  Error message.
   * @param {object|array} error.errors -  A collection of  error message.
   * @memberof Helpers
   * @returns {JSON} - A JSON failure response.
   */
 export const errorResponse =(req, res, error) => {
   console.log(error);
    const aggregateError = { ...serverError, ...error };
    apiErrLogMessenger(aggregateError, req);
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors
    });
  }
  export const sendGraphQLResponse = (status, message, data=null) => ({
    status,
    message,
    data
  });
  export const errorResolver = (error, message) => {
    switch (error.message) {
      // case 'DUP':
      //   moduleErrLogMessager(error);
      //   return sendGraphQLResponse(CONFLICT, DUPLICATED_ENTITY);
      case 'FOR':
        moduleErrLogMessager(error);
        return sendGraphQLResponse(403, ROLE_NOT_SUFFICIENT);
      default:
        moduleErrLogMessager(error, 500, message );
        return sendGraphQLResponse(500, DEFAULT_ERROR_MSG);
    }
  };
