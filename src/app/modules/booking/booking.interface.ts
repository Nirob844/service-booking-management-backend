import { BookingStatus } from '@prisma/client';

export type IBookingData = {
  id: string;
  userId: string;
  status: BookingStatus;
  bookingServices: IBookingService[];
};

export type IBookingService = {
  Id: string;
  serviceId: string;
  bookingDate: string;
};
