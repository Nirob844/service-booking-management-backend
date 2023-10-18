import express from 'express';
import { ReviewAndRatingController } from './ReviewAndRating.controller';

const router = express.Router();

router.get('/', ReviewAndRatingController.getAllFromDB);
router.get('/:id', ReviewAndRatingController.getDataById);
router.get('/:serviceId/service', ReviewAndRatingController.getDataByServiceId);
router.post('/review', ReviewAndRatingController.insertIntoDB);
router.patch('/:id', ReviewAndRatingController.updateOneInDB);
router.delete('/:id', ReviewAndRatingController.deleteByIdFromDB);

export const ReviewAndRatingRoutes = router;
