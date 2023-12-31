import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfileFromDB = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const result = await ProfileService.getProfileFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' data fetched!!',
    data: result,
  });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const result = await ProfileService.updateOneInDB(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfileFromDB,
  updateOneInDB,
};
