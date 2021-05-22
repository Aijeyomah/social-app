import db from '../db';
import queries from '../db/queries/auth';
import { DBError , moduleErrLogMessager} from '../utils';

const { createUser } = queries;
/**
 *contains a schema that describes the staff resource on the app
 * @class StaffModel
 */
class UserModel {
  /**
   *
   *Creates an instance of StaffModel.
   * @param {object} options - contains the required properties for creating a
   * staff instance.
   * @returns { StaffModel } - An instance of the Staff Model.
   * @memberof StaffModel
   */
  constructor(options) {
    (this.id = options.id);
    (this.first_name = options.first_name);
    (this.last_name = options.last_name);
    (this.user_name = options.user_name);
    (this.email = options.email);
    (this.phone_number = options.phone_number);
    (this.password = options.hash);
    (this.salt = options.salt);
  }

  async save() {
    try {
      return await db.one(createUser, [
        this.id,
        this.first_name,
        this.last_name,
        this.user_name,
        this.email,
        this.phone_number,
        this.password,
        this.salt,
      ]);
    } catch (error) {
      const dbError = new DBError({
        status: 400,
        message: error.message,
      });
      moduleErrLogMessager(dbError);
      throw dbError;
    }
  }
  

}
export default UserModel;
