import { Router } from 'express';
import authRoutes from './auth';
import postRoutes from './post';

const router = Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);
// router.use('/user', userRoute)


 




export default router;