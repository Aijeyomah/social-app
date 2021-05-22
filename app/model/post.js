import { loggers } from 'winston';
import db from '../db';
import queries from '../db/queries/user';
import {  DBError , moduleErrLogMessager} from '../utils';

const { createPost } = queries;
/**
 *contains a schema that describes a users posts
 * @class StaffModel
 */
class PostModel {
  /**
   *
   *Creates an instance of PostModel.
   * @param {object} options - contains the required properties for creating a post
   * staff instance.
   * @returns { PostModel } - An instance of the Post Model.
   * @memberof PostModel
   */
  constructor(options) {
    console.log(options);
    (this.user_id = options.user_id);
    (this.image_path = options.image_path);
    (this.image_latitude = options.image_latitude);
    (this.image_longitude = options.image_longitude);
    (this.user_latitude = options.user_latitude);
    (this.caption = options.caption);
    (this.last_ip = options.last_ip);
  }

  async save() {
    try {
      return await db.one(createPost, [
        this.user_id,
        this.image_path,
        this.image_latitude,
        this.image_longitude,
        this.user_latitude,
        this.caption,
        this.last_ip,
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
export default PostModel;
 