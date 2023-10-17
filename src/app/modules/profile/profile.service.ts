import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getProfileFromDB = async (userId: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return result; // Allow null values
};

const updateOneInDB = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const ProfileService = {
  getProfileFromDB,
  updateOneInDB,
};
