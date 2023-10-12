import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ServiceController } from './service.controller';

const router = express.Router();

router.get('/', ServiceController.getAllFromDB);
router.get('/:id', ServiceController.getDataById);
router.get('/:categoryId/category', ServiceController.getDataByCategoryId);
router.post(
  '/create-Service',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.updateOneInDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteByIdFromDB
);

export const ServiceRoutes = router;
