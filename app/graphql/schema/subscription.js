import { gql } from 'apollo-server-express';

const subscription = gql`

  extend type Subscription {
    followedUser(id: String): String
}
`;

export default subscription;