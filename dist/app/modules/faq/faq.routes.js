"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq.controller");
const router = express_1.default.Router();
router.get('/', faq_controller_1.FAQController.getAllFromDB);
router.get('/:id', faq_controller_1.FAQController.getDataById);
router.post('/', faq_controller_1.FAQController.insertIntoDB);
router.patch('/:id', faq_controller_1.FAQController.updateOneInDB);
router.delete('/:id', faq_controller_1.FAQController.deleteByIdFromDB);
exports.FAQRoutes = router;
