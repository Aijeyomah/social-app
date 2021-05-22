import {  ApiError, errorResponse } from '../../utils';
  
  /**
   * validate request body
   * @param {object} req - The request from the endpoint.
   * @param {object} res - The response returned by the method.
   * @param {function} next - Call the next operation.
   * @returns {function} - Returns a function 
   * @memberof validationMiddleWare
   *
   */
  export const validateBody = (schema) => async(req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const apiError = new ApiError({
        status: 400,
        message: error.details[0].message,
      });
      errorResponse(req, res, apiError);
    }
  }
