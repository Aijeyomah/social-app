import UserModel from '../../model/user';
import {  constants, genericErrors, ApiError, successResponse , compareHash, errorResponse, addTokenToData, hashPassword, regenerateUniqueId} from '../../utils';
import queries from '../../db/queries/auth';

const { getUserById } = queries;
const { CREATE_USER_SUCCESSFULLY, CREATE_USER_FAILED, LOGIN_USER_SUCCESSFULLY , LOGIN_USER_FAILED} = constants;

/**
   * create a  user.
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the user's details and a JWT.
   * @memberof StaffAuthController
   */
export const signup = async(req, res, next) => {
    try {
      const { password } = req.body;
      req.body.id = await regenerateUniqueId('USR', getUserById);
      const { hash, salt } = await hashPassword(password);
      req.body.salt = salt;
      req.body.hash = hash;
      const user = new UserModel(req.body);
      const data = await user.save();
      return successResponse(res, {
        data,
        message: CREATE_USER_SUCCESSFULLY,
        code: 201
      });
    } catch (e) {
        next(new ApiError({ message: CREATE_USER_FAILED, errors: e.message }));
    }
  };
/**
   * Logs in a user.
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the user's details and a JWT.
   * @memberof StaffAuthController
   */
 export const signin = (req, res, next)=> {
    try {
      const { user, body } = req;
 
    const isAuthenticUser = compareHash(
      body.password,
      user.password,
      user.salt
    );
    if (!isAuthenticUser) {
      return errorResponse(req, res, genericErrors.inValidLogin);
    }

     const data = addTokenToData(user);
      successResponse(res, { data, message: LOGIN_USER_SUCCESSFULLY });
    } catch (e) {
      logger.error(e)
      next(new ApiError({ message: LOGIN_USER_FAILED, errors: e.message }));
    }
  };