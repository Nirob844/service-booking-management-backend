import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedback.controller';

const router = express.Router();

router.get('/', FeedbackController.getAllFromDB);
router.get('/:id', FeedbackController.getDataById);
router.post(
  '/',
  auth(ENUM_USER_ROLE.CUSTOMER),
  FeedbackController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER),
  FeedbackController.updateOneInDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER),
  FeedbackController.deleteByIdFromDB
);

export const FeedbackRoutes = router;
