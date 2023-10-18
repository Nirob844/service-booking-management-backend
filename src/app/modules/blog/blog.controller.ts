import { Blog } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BlogService } from './blog.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.insertIntoDB(req.body);
  sendResponse<Blog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Created!!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' data fetched!!',
    data: result,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog data fetched!!',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.updateOneInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' delete successfully',
    data: result,
  });
});

export const BlogController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
