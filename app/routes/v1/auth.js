import { Router } from 'express';
import {signin , signup} from '../../controllers/auth';
import { validateBody } from  '../../middleware/validations'
import { loginSchema } from '../../validations/auth';
import { signUpValidator, userLoginEmailValidator } from '../../middleware/auth/basic';


const router = Router();

router.post(
  '/signup',
  //validateApiParameter(),
  signUpValidator,
  signup
);

router.post(
  '/login',
  validateBody(loginSchema),
  userLoginEmailValidator,
  signin
);

export default router;
