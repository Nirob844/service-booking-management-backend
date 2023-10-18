import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BlogController } from './blog.controller';

const router = express.Router();

router.get('/', BlogController.getAllFromDB);
router.get('/:id', BlogController.getDataById);
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.updateOneInDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BlogController.deleteByIdFromDB
);

export const BlogRoutes = router;
