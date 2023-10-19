import express from 'express';
import { FAQController } from './faq.controller';

const router = express.Router();

router.get('/', FAQController.getAllFromDB);
router.get('/:id', FAQController.getDataById);
router.post('/', FAQController.insertIntoDB);
router.patch('/:id', FAQController.updateOneInDB);
router.delete('/:id', FAQController.deleteByIdFromDB);

export const FAQRoutes = router;
