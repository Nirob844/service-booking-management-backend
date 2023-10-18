import { ReviewAndRating } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ReviewAndRatingService } from './ReviewAndRating.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewAndRatingService.insertIntoDB(req.body);
  sendResponse<ReviewAndRating>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Created!!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewAndRatingService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' data fetched!!',

    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewAndRatingService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' data fetched!!',
    data: result,
  });
});

const getDataByServiceId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);
  const result = await ReviewAndRatingService.getDataByServiceId(
    req.params.serviceId,
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

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewAndRatingService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewAndRatingService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete successfully',
    data: result,
  });
});

export const ReviewAndRatingController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  getDataByServiceId,
  updateOneInDB,
  deleteByIdFromDB,
};
