import { getFollower } from "../../services/user";
import { skip } from 'graphql-resolvers';
import { sendGraphQLResponse , constants} from "../../utils";

const {AlREADY_FOLLOWING_USER} = constants;


export const isFollowUser = async(_, {data}, ctx ) => {
    
  const user =  await getFollower(data.followingId);
    if(!user){
        return skip;
    }
   return sendGraphQLResponse(400, AlREADY_FOLLOWING_USER)
}