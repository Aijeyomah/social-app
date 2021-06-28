import { gql } from 'apollo-server-express';

const subscription = gql`

type UserFollowData {
    id: String!
    userName: String!
}

  extend type Subscription {
    followedUser(id: String): UserFollowData
}
`;

export default subscription;