import { combineResolvers } from 'graphql-resolvers';
import { followUser } from '../../controllers/user/user';
import { authenticate } from '../../middleware/auth/basic';
import { isFollowUser } from '../../middleware/user';



const user = {
    Query: {},
    Mutation: {
        followUser: combineResolvers(
            authenticate,
            isFollowUser,
            followUser
      )
    }
  };  

export default user;