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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AddCartService = void 0;
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const insertIntoDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.addCart.create({
      data,
    });
    return result;
  });
const getAllFromDB = (userId, role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'super_admin') {
      // Administrators can access all AddCarts
      const allAddCarts = yield prisma_1.default.addCart.findMany({
        include: {
          user: true,
          service: true,
        },
      });
      return allAddCarts;
    } else if (role === 'admin') {
      // Administrators can access all AddCarts
      const allAddCarts = yield prisma_1.default.addCart.findMany({
        include: {
          user: true,
          service: true,
        },
      });
      return allAddCarts;
    } else if (role === 'customer') {
      // Customers can access their own AddCarts
      const customerAddCarts = yield prisma_1.default.addCart.findMany({
        where: {
          userId: userId, // Filter AddCarts by the customer's userId
        },
        include: {
          user: true,
          service: true,
        },
      });
      return customerAddCarts;
    } else {
      // Handle other roles or throw an error if needed
      throw new Error('Invalid role');
    }
  });
const updateOneInDB = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.addCart.update({
      where: {
        id,
      },
      data: payload,
    });
    return result;
  });
const deleteByIdFromDB = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.addCart.delete({
      where: {
        id,
      },
    });
    return result;
  });
exports.AddCartService = {
  insertIntoDB,
  getAllFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
