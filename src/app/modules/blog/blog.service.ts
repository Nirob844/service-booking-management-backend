import { Blog } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Blog): Promise<Blog> => {
  const result = await prisma.blog.create({
    data,
  });

  return result;
};

const getAllFromDB = async (): Promise<Blog[]> => {
  const result = await prisma.blog.findMany({});
  return result;
};

const getDataById = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Blog>
): Promise<Blog> => {
  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Blog> => {
  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BlogService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
