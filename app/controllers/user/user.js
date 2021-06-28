import { fetchUserProfile, FollowAUser } from "../../services/user";
import { pubsub } from "../../graphql/subscription";
import {
    constants, ApiError, successResponse, moduleErrLogMessager, sendGraphQLResponse
} from '../../utils';

const { ERROR_FOLLOWING_USER, SUCCESSFULLY_FOLLOW_USER, USER_PROFILE_FETCHED_SUCCESSFULLY, ERROR_FETCHING_USER_PROFILE } = constants;

export const followUser = async (_, { data }, ctx) => {
    try {
        const { followingId: following_id } = data
        const followedUser = await FollowAUser(ctx.user.id, following_id);
        pubsub.publish('FOLLOW_USER', { followedUser: followedUser })

        return sendGraphQLResponse(201, SUCCESSFULLY_FOLLOW_USER, null);
    } catch (e) {
        moduleErrLogMessager(e);
        return sendGraphQLResponse(500, ERROR_FOLLOWING_USER);
    }
};

export const getAUserProfile = async (_, { followingId, isUser }, ctx) => {
    try {

        const profile = await fetchUserProfile(ctx.user.id, followingId, isUser)
        if (profile) {
            return sendGraphQLResponse(201, USER_PROFILE_FETCHED_SUCCESSFULLY, profile);
        }
        return sendGraphQLResponse(500, ERROR_FETCHING_USER_PROFILE);

    } catch (error) {
        moduleErrLogMessager(e);
        return sendGraphQLResponse(500, ERROR_FETCHING_USER_PROFILE);
    }
};

export const getUserProfile = async (_, { }, ctx) => {
    try {

        const profile = await fetchUserProfile(ctx.user.id)
        if (profile) {
            return sendGraphQLResponse(201, USER_PROFILE_FETCHED_SUCCESSFULLY, profile);
        }
        return sendGraphQLResponse(500, ERROR_FETCHING_USER_PROFILE);

    } catch (error) {
        moduleErrLogMessager(e);
        return sendGraphQLResponse(500, ERROR_FETCHING_USER_PROFILE);
    }
};
