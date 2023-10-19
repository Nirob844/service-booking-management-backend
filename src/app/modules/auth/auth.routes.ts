import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validations';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.create),
  AuthController.insertIntoDB
);
router.post('/signin', AuthController.loginUser);

export const AuthRoutes = router;
