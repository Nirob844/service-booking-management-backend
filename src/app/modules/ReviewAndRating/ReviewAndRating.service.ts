import { ReviewAndRating } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  data: ReviewAndRating
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.create({
    data,
    include: {
      user: true,
      service: true,
    },
  });

  return result;
};

const getAllFromDB = async (): Promise<ReviewAndRating[]> => {
  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getDataById = async (id: string): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const getDataByServiceId = async (
  serviceId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<ReviewAndRating[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const results = await prisma.reviewAndRating.findMany({
    include: {
      service: true,
    },
    where: {
      serviceId: serviceId,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.reviewAndRating.count({
    where: {
      serviceId: serviceId,
    },
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: results,
  };
};

const updateOneInDB = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ReviewAndRatingService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  getDataByServiceId,
  updateOneInDB,
  deleteByIdFromDB,
};
