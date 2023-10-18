import { AddCart } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: AddCart): Promise<AddCart> => {
  const result = await prisma.addCart.create({
    data,
  });

  return result;
};

const getAllFromDB = async (
  userId: string,
  role: string
): Promise<AddCart[]> => {
  if (role === 'super_admin') {
    // Administrators can access all AddCarts
    const allAddCarts = await prisma.addCart.findMany({
      include: {
        user: true,
        service: true,
      },
    });
    return allAddCarts;
  } else if (role === 'admin') {
    // Administrators can access all AddCarts
    const allAddCarts = await prisma.addCart.findMany({
      include: {
        user: true,
        service: true,
      },
    });
    return allAddCarts;
  } else if (role === 'customer') {
    // Customers can access their own AddCarts
    const customerAddCarts = await prisma.addCart.findMany({
      where: {
        userId: userId, // Filter AddCarts by the customer's userId
      },
      include: {
        user: true,
        service: true,
      },
    });
    return customerAddCarts;
  } else {
    // Handle other roles or throw an error if needed
    throw new Error('Invalid role');
  }
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AddCart>
): Promise<AddCart> => {
  const result = await prisma.addCart.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<AddCart> => {
  const result = await prisma.addCart.delete({
    where: {
      id,
    },
  });
  return result;
};

export const AddCartService = {
  insertIntoDB,
  getAllFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
