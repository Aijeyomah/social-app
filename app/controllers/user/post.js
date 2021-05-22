import PostModel from '../../model/post';
import { cloudinaryConfig } from '../../services/uploadServices'
import {
    constants, ApiError, successResponse, moduleErrLogMessager
} from '../../utils';

const {CREATE_POST_SUCCESSFULLY, ERROR_CREATING_POST} = constants;

export const createPost = async(req, res, next) =>{
    try {
        let { body, user } = req;
        const image = await cloudinaryConfig(req.file.path);
        body.last_ip = req.ip;
        const post = new PostModel({...body, user_id: user.id, image_path: image.secure_url});
        const userPost = await post.save();
        return successResponse(res, {
            userPost,
            message: CREATE_POST_SUCCESSFULLY,
            code: 201
          });

    } catch (e) {
        moduleErrLogMessager(e)
        next(new ApiError({ message: ERROR_CREATING_POST, errors: e.message }));
    }
};

export const fetchUsersProfile = (req, res, next)=>{
    try {
        const {} = req.body;
    } catch (error) {
        
    }
}