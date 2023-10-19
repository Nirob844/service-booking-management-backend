import { z } from 'zod';

const UserRoleSchema = z.enum(['super_admin', 'admin', 'customer']);

const create = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    image: z.string().optional(),
    role: UserRoleSchema.optional(),
  }),
});

export const UserValidation = {
  create,
};
