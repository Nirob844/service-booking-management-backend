import { Prisma, Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  serviceRelationalFields,
  serviceRelationalFieldsMapper,
  serviceSearchAbleFields,
} from './service.constants';

const insertIntoDB = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minPrice, maxPrice, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (serviceRelationalFields.includes(key)) {
          return {
            [serviceRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // Convert minPrice and maxPrice to floats
  const minPriceFloat = parseFloat(minPrice);
  const maxPriceFloat = parseFloat(maxPrice);
  if (!isNaN(minPriceFloat)) {
    andConditions.push({
      price: {
        gte: minPriceFloat,
      },
    });
  }

  if (!isNaN(maxPriceFloat)) {
    andConditions.push({
      price: {
        lte: maxPriceFloat,
      },
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.service.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const getDataByCategoryId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const results = await prisma.service.findMany({
    include: {
      category: true,
    },
    where: {
      categoryId: categoryId,
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
  const total = await prisma.service.count({
    where: {
      categoryId: categoryId,
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
  payload: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ServiceService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  getDataByCategoryId,
  updateOneInDB,
  deleteByIdFromDB,
};
