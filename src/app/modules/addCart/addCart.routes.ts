import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AddCartController } from './addCart.controller';

const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.CUSTOMER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AddCartController.getAllFromDB
);
router.post('/', auth(ENUM_USER_ROLE.CUSTOMER), AddCartController.insertIntoDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AddCartController.updateOneInDB
);
router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  AddCartController.deleteByIdFromDB
);

export const AddCartRoutes = router;
