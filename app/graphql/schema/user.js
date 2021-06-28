import {gql} from 'apollo-server-express';

const User = gql`


type UserData {
    status: Int!
    message: String!
    # data: FollowUserData
}

type UserProfileDetails {
    id: String!
    firstName: String!
    lastName: String!
    profilePics: String 
    bio: String
    following: String!
    followers: String!

}

type AUserProfileData {
    id: String!
    firstName: String!
    lastName: String!
    profilePics: String 
    bio: String
    following: String!
    followers: String!
    isFollow: Boolean!
}

type UserDetailsResponse {
    status: Int!
    message: String!
    data: UserProfileDetails

}

type AUserProfileResponse {
    status: Int!
    message: String!
    data: AUserProfileData

}



input FollowUserInput {
    followingId: String!
}

extend type Query {
    getUserProfile: UserDetailsResponse
}

extend type Query {
    getAUserProfile(followingId: String!, isUser: Boolean!): AUserProfileResponse!
}

extend type Mutation{
    followUser(data: FollowUserInput): UserData!
}
`

export default User;