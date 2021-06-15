import { resolvers as scalarResolvers } from 'graphql-scalars';
import post from './post';
import user from './user'



const resolvers = [
    scalarResolvers,
    post,
    user

];

export default resolvers;