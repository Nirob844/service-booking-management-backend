import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const result = await BookingService.insertIntoDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as any;
  const result = await BookingService.getAllFromDB(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' data fetched!!',

    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as any;
  const result = await BookingService.getDataById(req.params.id, userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' data fetched!!',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete successfully',
    data: result,
  });
});

export const BookingController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
