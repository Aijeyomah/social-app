import {  ApiError, constants, genericErrors, errorResponse, verifyToken, moduleErrLogMessager, sendGraphQLResponse } from '../../utils';
import { fetchByEmailOrPhoneNumber } from '../../services/user';
import { skip } from 'graphql-resolvers';

const { DATA_CONFLICT, USER_DATA_EXIST_VERIFICATION_FAIL_MSG, AUTH_REQUIRED } = constants;


/**
* Checks if a specific already exist for a user account.
* @static
* @param { Object } req - The request from the endpoint.
* @param { Object } res - The response returned by the method.
* @param { function } next - Calls the next handle.
* @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
* @memberof AuthMiddleware
*
*/
export const signUpValidator = async (req, res, next) => {
    const { phone_number, email } = req.body;
    const field = phone_number ? phone_number : email 
    try {
        const staff = await fetchByEmailOrPhoneNumber(field);
        if (staff) {
            return errorResponse(
                req,
                res,
                new ApiError({
                    status: 409,
                    message: DATA_CONFLICT(field)
                })
            );
        }
        next();
    } catch (e) {
        e.status = USER_DATA_EXIST_VERIFICATION_FAIL_MSG(field);
        moduleErrLogMessager(e);
        errorResponse(
            req,
            res,
            new ApiError({ message: USER_DATA_EXIST_VERIFICATION_FAIL_MSG(field) })
        );
    }
}


/**
 * Validates staff's login credentials, with emphasis on the
 * existence of a user with the provided email address.
 * @static
 * @param { Object } req - The request from the endpoint.
 * @param { Object } res - The response returned by the method.
 * @param { function } next - Calls the next handle.
 * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
 * @memberof AuthMiddleware
 *
 */
export const userLoginEmailValidator = async (req, res, next) => {
    const { phone_number, email } = req.body;
    let field;
    let msg;
    
    if (phone_number){
        field = phone_number
        msg = 'phone number'
    }else {
        field = email
        msg = 'email'
    }
    try {
        const userData = await fetchByEmailOrPhoneNumber(field);
        if (!userData) {
            return errorResponse(req, res, genericErrors.inValidLogin);
        }
        req.user = userData;
        next();
    } catch (e) {
        e.status = constants.USER_DATA_EXIST_VERIFICATION_FAIL_MSG(field);
        moduleErrLogMessager(e);
        errorResponse(
            req,
            res,
            new ApiError({ message: USER_DATA_EXIST_VERIFICATION_FAIL_MSG(field) })
        );
    }
}

/**
 * Checks for token in the authorization and x-access-token header properties.
 * @static
 * @private
 * @param {object} authorization - The headers object
 * @memberof AuthMiddleware
 * @returns {string | null} - Returns the Token or Null
 */
export const checkAuthorizationToken = (authorization) => {
    let bearerToken = null;
    if (authorization) {
        const token = authorization.split(' ')[1];
        bearerToken = token || authorization;
    }
    return bearerToken;
}

/**
 * Aggregates a search for the access token in a number of places.
 * @static
 * @private
 * @param {Request} req - The express request object.
 * @memberof AuthMiddleware
 * @returns {string | null} - Returns the Token or Null
 */
export const checkToken = (req) => {
    const {
        headers: { authorization },
    } = req;
    const bearerToken = checkAuthorizationToken(authorization);
    return (
        bearerToken ||
        req.headers['x-access-token'] ||
        req.headers.token ||
        req.body.token
    );
}

/**
 * Verifies the validity of a user's access token or and the presence of it.
 * @static
 * @param { Object } req - The request from the endpoint.
 * @param { Object } res - The response returned by the method.
 * @param { function } next - Calls the next handle.
 * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
 * @memberof AuthMiddleware
 *
 */
export const authenticate = async (_, {}, ctx) => {
    try {
           const token = checkToken(ctx);
        if (!token) {
            return sendGraphQLResponse(401, AUTH_REQUIRED);
        }

        const decoded = await verifyToken(token);
        ctx.user = decoded;
        skip;
    } catch (e) {
        moduleErrLogMessager(e)
       sendGraphQLResponse(e)
    }
}
