import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../shared/utils';
import { IBookingData, IBookingService } from './booking.interface';

const insertIntoDB = async (
  userId: string,
  data: IBookingData
): Promise<any> => {
  data.userId = userId;

  const { bookingServices, ...bookingData } = data;
  const newBooking = await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.booking.create({
      data: bookingData,
    });

    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create');
    }

    if (bookingServices && bookingServices.length > 0) {
      await asyncForEach(
        bookingServices,
        async (bookingData: IBookingService) => {
          await transactionClient.bookingService.create({
            data: {
              bookingId: result.id,
              serviceId: bookingData.serviceId,
              bookingDate: bookingData.bookingDate,
            },
          });
        }
      );
    }
    return result;
  });

  if (newBooking) {
    const responseData = await prisma.booking.findUnique({
      where: {
        id: newBooking.id,
      },
      include: {
        user: true,
        bookingServices: {
          include: {
            service: true,
          },
        },
      },
    });

    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const getAllFromDB = async (
  userId: string,
  role: string
): Promise<Booking[]> => {
  if (role === 'super_admin') {
    // Administrators can access all Bookings
    const allBookings = await prisma.booking.findMany({
      include: {
        user: true,
        bookingServices: {
          include: {
            service: true,
          },
        },
      },
    });
    return allBookings;
  } else if (role === 'admin') {
    // Administrators can access all Bookings
    const allBookings = await prisma.booking.findMany({
      include: {
        user: true,
        bookingServices: {
          include: {
            service: true,
          },
        },
      },
    });
    return allBookings;
  } else if (role === 'customer') {
    // Customers can access their own Bookings
    const customerBookings = await prisma.booking.findMany({
      where: {
        userId: userId, // Filter Bookings by the customer's userId
      },
      include: {
        user: true,
        bookingServices: {
          include: {
            service: true,
          },
        },
      },
    });
    return customerBookings;
  } else {
    // Handle other roles or throw an error if needed
    throw new Error('Invalid role');
  }
};

const getDataById = async (
  BookingId: string,
  userId: string,
  role: string
): Promise<Booking | null> => {
  let Booking: Booking | null = null;

  if (role === 'admin') {
    // Admins can access any Booking
    Booking = await prisma.booking.findUnique({
      where: {
        id: BookingId,
      },
      include: {
        user: true,
        bookingServices: {
          include: {
            service: true,
          },
        },
      },
    });
  } else if (role === 'customer') {
    // Customers can access their own Bookings
    Booking = await prisma.booking.findUnique({
      where: {
        id: BookingId,
        userId: userId, // Ensure the Booking belongs to the customer
      },
      include: {
        user: true,
        bookingServices: {
          include: {
            service: true,
          },
        },
      },
    });
  } else {
    // Handle other roles or throw an error if needed
    throw new Error('Invalid role');
  }

  return Booking;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Booking>
): Promise<Booking> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookingService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
