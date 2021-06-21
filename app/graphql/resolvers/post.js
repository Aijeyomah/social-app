import { combineResolvers } from 'graphql-resolvers';
import { createPost } from '../../controllers/user/post';
import { authenticate } from '../../middleware/auth/basic';



const AddPost = {
    Query: {},
    Mutation: {
        createPost: combineResolvers(
            authenticate,
            createPost
      )
    },
    Subscription: {
      
    }
  };  
  


export default AddPost;