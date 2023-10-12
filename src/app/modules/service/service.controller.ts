import { Service } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterAbleFields } from './service.constants';
import { ServiceService } from './service.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.insertIntoDB(req.body);
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Created!!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterAbleFields);
  const options = pick(req.query, paginationFields);
  const result = await ServiceService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service data fetched!!',
    meta: result.meta,
    data: result.data,
  });
});

const getDataByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const result = await ServiceService.getDataByCategoryId(
    req.params.categoryId,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service data fetched!!',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service data fetched!!',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service delete successfully',
    data: result,
  });
});

export const ServiceController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  getDataByCategoryId,
  updateOneInDB,
  deleteByIdFromDB,
};
