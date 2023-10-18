import { AddCart } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AddCartService } from './addCart.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AddCartService.insertIntoDB(req.body);
  sendResponse<AddCart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AddCart Created!!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AddCartService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' data fetched!!',
    data: result,
  });
});

export const AddCartController = {
  insertIntoDB,
  getAllFromDB,
};
