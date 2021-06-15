import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import post from './post';
import root from './root';
import user from './user';

const schemaArray = [
    root, 
    ...scalarTypeDefs,
    post,
    user
];

export default schemaArray;