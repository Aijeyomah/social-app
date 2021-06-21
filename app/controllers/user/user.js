import { FollowAUser } from "../../services/user";
import { pubsub } from "../../graphql/subscription";
import {
    constants, ApiError, successResponse, moduleErrLogMessager, sendGraphQLResponse
} from '../../utils';

const { ERROR_FOLLOWING_USER, SUCCESSFULLY_FOLLOW_USER} = constants;

export const followUser = async(_, { data }, ctx) => {
try {
   const { followingId: following_id } = data
   const followedUser = await FollowAUser(ctx.user.id, following_id);
   pubsub.publish('FOLLOW_USER', {followedUser: followedUser})  
   
   return sendGraphQLResponse(201, SUCCESSFULLY_FOLLOW_USER, null);
} catch (e) {
    moduleErrLogMessager(e);
    return sendGraphQLResponse(500, ERROR_FOLLOWING_USER);
}
};