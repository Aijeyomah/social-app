import { typeDefs as scalarTypeDefs } from 'graphql-scalars';
import post from './post';
import root from './root';
import subscription from './subscription';
import user from './user';

const schemaArray = [
    root, 
    ...scalarTypeDefs,
    post,
    user,
    subscription
];

export default schemaArray;