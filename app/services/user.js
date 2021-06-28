import authQueries from "../db/queries/auth";
import userQueries from "../db/queries/user";
import db from "../db";
import {DBError, moduleErrLogMessager} from "../utils";

const {
  getUserByEmailOrPhoneNumber,
  getUserById,
  followUser,
  userFollow,
  getUserFollowing,
} = authQueries;
const {getUserProfile, fetchProfile} = userQueries;
/**
 * Fetches a user by his/her email.
 * @memberof UserService
 * @param { String } field - The email address or phone number of the user.
 * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
 * with a user resource  or a DB Error.
 */
export const fetchByEmailOrPhoneNumber = async (field) => {
  return db.oneOrNone(getUserByEmailOrPhoneNumber, [field]);
};

/**
 * Fetches a user by his/her id.
 * @memberof userService
 * @param { String } id - The id of the user.
 * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
 * with a user resource  or a DB Error.
 */
export const fetchByUserId = async (id) => db.oneOrNone(getUserById, [id]);

export const FollowAUser = async (user_id, followerId) => {
  try {
    const data = db.tx((t) => {
      const q1 = t.oneOrNone(followUser, [followerId, user_id]);
      const q2 = t.oneOrNone(userFollow, [user_id, followerId]);
      const q3 = t.oneOrNone(getUserById, [followerId]);
      return t.batch([q1, q2, q3]);
    });
    const result = await data;

    const {id, userName} = result[2];
    return {id, userName};
  } catch (error) {
    const dbError = new DBError({
      status: 400,
      message: error.message,
    });
    moduleErrLogMessager(dbError);
    throw dbError;
  }
};

export const fetchUserProfile = async(userId, followingId=null, isUser=false) => {
  try {
    let profileQuery;
    if (!isUser) {
      profileQuery = await db.oneOrNone(fetchProfile, [userId]);
    } else {
      profileQuery = await db.oneOrNone(getUserProfile, [followingId, userId]);
    }
    
    return profileQuery;
  } catch (error) {
    const dbError = new DBError({
      status: 400,
      message: error.message,
    });
    moduleErrLogMessager(dbError);
    throw dbError;
  }
};

export const getFollower = async (followingId, userId) =>
  db.oneOrNone(getUserFollowing, [followingId, userId]);
