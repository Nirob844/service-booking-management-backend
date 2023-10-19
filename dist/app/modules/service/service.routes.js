'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_1 = require('../../../enums/user');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const service_controller_1 = require('./service.controller');
const router = express_1.default.Router();
router.get('/', service_controller_1.ServiceController.getAllFromDB);
router.get('/:id', service_controller_1.ServiceController.getDataById);
router.get(
  '/:categoryId/category',
  service_controller_1.ServiceController.getDataByCategoryId
);
router.post(
  '/create-service',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  service_controller_1.ServiceController.insertIntoDB
);
router.patch(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  service_controller_1.ServiceController.updateOneInDB
);
router.delete(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SUPER_ADMIN,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  service_controller_1.ServiceController.deleteByIdFromDB
);
exports.ServiceRoutes = router;
