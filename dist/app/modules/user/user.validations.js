'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserValidation = void 0;
const zod_1 = require('zod');
const UserRoleSchema = zod_1.z.enum(['super_admin', 'admin', 'customer']);
const create = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    image: zod_1.z.string().optional(),
    role: UserRoleSchema.optional(),
  }),
});
exports.UserValidation = {
  create,
};
