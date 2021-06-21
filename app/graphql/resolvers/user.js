import { combineResolvers } from 'graphql-resolvers';
import { followUser } from '../../controllers/user/user';
import { authenticate } from '../../middleware/auth/basic';
import { isFollowUser } from '../../middleware/user';
import { withFilter, pubsub } from '../subscription'



const user = {
    Query: {},
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
      followedUser: {
        subscribe: withFilter( 
          () => pubsub.asyncIterator('FOLLOW_USER'),
        (payload, variables) => {
          return (payload.followedUser.id === variables.id);
      })
  } 
}
}
};
export default user;