import { AddCart } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: AddCart): Promise<AddCart> => {
  const result = await prisma.addCart.create({
    data,
  });

  return result;
};

const getAllFromDB = async (): Promise<AddCart[]> => {
  const result = await prisma.addCart.findMany({
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

export const AddCartService = {
  insertIntoDB,
  getAllFromDB,
};
