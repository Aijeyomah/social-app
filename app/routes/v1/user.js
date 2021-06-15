import {Router} from 'express'
import {followUser} from '../../controllers/user/user';
import { authenticate } from '../../middleware/auth/basic';

const router = Router();

router.post(
    '/follow-user',
    authenticate,
    followUser
);

export default router;