import {Router} from 'express'
import {createPost} from '../../controllers/user/post';
import { authenticate } from '../../middleware/auth/basic';
import { validateBody } from '../../middleware/validations';
import {multerConfig as upload} from '../../services/uploadServices'
import { createPostSchema } from '../../validations/user';

const router = Router();

router.post(
    '/create-post',
    authenticate,
    validateBody(createPostSchema),
    upload.array("image", 5),
    createPost
);





export default router;