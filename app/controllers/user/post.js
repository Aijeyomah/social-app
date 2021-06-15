import PostModel from '../../model/post';
import { processUpload } from '../../services/uploadServices';
import { constants, moduleErrLogMessager} from '../../utils';
import { sendGraphQLResponse } from '../../utils/helpers';

const { CREATE_POST_SUCCESSFULLY, ERROR_CREATING_POST , DEFAULT_ERROR_MSG} = constants;


export const createPost = async(_, args, ctx)  =>{
    try {
        const image = await processUpload(args.imagePath);
        const post = new PostModel({ ...args.data, lastIp : ctx.ip, userId: ctx.id, imagePath: image.secure_url });
        const userPost = await post.save();
        return sendGraphQLResponse(200, CREATE_POST_SUCCESSFULLY, userPost);

    } catch (e) {
        moduleErrLogMessager(e)
        return sendGraphQLResponse(INTERNAL_SERVER_ERROR, DEFAULT_ERROR_MSG);
    }
}