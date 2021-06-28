import { combineResolvers } from 'graphql-resolvers';
import { followUser, getUserProfile , getAUserProfile} from '../../controllers/user/user';
import { authenticate } from '../../middleware/auth/basic';
import { isFollowUser } from '../../middleware/user';
import { withFilter, pubsub } from '../subscription'



const user = {
    Query: {
      getUserProfile: combineResolvers(
        authenticate,
        getUserProfile
      ),
      
      getAUserProfile: combineResolvers(
        authenticate,
        getAUserProfile
      )
    },

    Mutation: {
      followUser: combineResolvers(
        authenticate,
          isFollowUser,
          followUser
      )
    },
    Subscription: {
      followedUser: {
        resolve: (payload) => {
          return payload.followedUser;
        },
        subscribe: withFilter(
          () => pubsub.asyncIterator("FOLLOW_USER"),
          (payload, variables) => {
            return payload.followedUser.id === variables.id;
          }
        ),
      },
    },
};
export default user;