import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AddCartController } from './addCart.controller';

const router = express.Router();

router.get('/', AddCartController.getAllFromDB);
router.post('/', auth(ENUM_USER_ROLE.CUSTOMER), AddCartController.insertIntoDB);

export const AddCartRoutes = router;
