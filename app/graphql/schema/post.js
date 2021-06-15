import {gql} from 'apollo-server-express';

const Post = gql`

    type Post {
        userId: ID ,
        imagePath: String!
        imageLatitude: String
        imageLongitude: String
        userLatitude: String
        caption: String 
        lastIp: String!
        created_at: DateTime!
    }

    input PostTypeData {
        imagePath: String!
        imageLatitude: String
        imageLongitude: String
        userLatitude: String
        caption: String
    }

    type PostResponseData {
        status: Int!
        message: String!
        data: Post!
    }

    extend type Mutation {
        createPost(data: PostTypeData!): PostResponseData
    }
`;

export default Post;
