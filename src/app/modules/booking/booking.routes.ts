import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingController } from './booking.controller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  BookingController.getAllFromDB
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  BookingController.getDataById
);
router.post(
  '/create-booking',
  auth(ENUM_USER_ROLE.CUSTOMER),
  BookingController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.updateOneInDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.deleteByIdFromDB
);

export const BookingRoutes = router;
