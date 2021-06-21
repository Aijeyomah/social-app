import {gql} from 'apollo-server-express';

const User = gql`


type UserData {
    status: Int!
    message: String!
    # data: FollowUserData
}

input FollowUserInput {
    followingId: String!
}

extend type Mutation{
    followUser(data: FollowUserInput): UserData!
}
`

export default User;