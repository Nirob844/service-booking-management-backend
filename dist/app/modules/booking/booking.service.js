'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const utils_1 = require('../../../shared/utils');
const insertIntoDB = (userId, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    data.userId = userId;
    const { bookingServices } = data,
      bookingData = __rest(data, ['bookingServices']);
    const newBooking = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.booking.create({
          data: bookingData,
        });
        if (!result) {
          throw new ApiError_1.default(
            http_status_1.default.BAD_REQUEST,
            'Unable to create'
          );
        }
        if (bookingServices && bookingServices.length > 0) {
          yield (0, utils_1.asyncForEach)(bookingServices, bookingData =>
            __awaiter(void 0, void 0, void 0, function* () {
              yield transactionClient.bookingService.create({
                data: {
                  bookingId: result.id,
                  serviceId: bookingData.serviceId,
                  bookingDate: bookingData.bookingDate,
                },
              });
            })
          );
        }
        return result;
      })
    );
    if (newBooking) {
      const responseData = yield prisma_1.default.booking.findUnique({
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
    throw new ApiError_1.default(
      http_status_1.default.BAD_REQUEST,
      'Unable to create course'
    );
  });
const getAllFromDB = (userId, role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'super_admin') {
      // Administrators can access all Bookings
      const allBookings = yield prisma_1.default.booking.findMany({
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
      const allBookings = yield prisma_1.default.booking.findMany({
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
      const customerBookings = yield prisma_1.default.booking.findMany({
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
  });
const getDataById = (BookingId, userId, role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let Booking = null;
    if (role === 'admin') {
      // Admins can access any Booking
      Booking = yield prisma_1.default.booking.findUnique({
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
      Booking = yield prisma_1.default.booking.findUnique({
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
  });
const updateOneInDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
      where: {
        id,
      },
      data: payload,
    });
    return result;
  });
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
      where: {
        id,
      },
    });
    return result;
  });
exports.BookingService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
