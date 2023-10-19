'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const ReviewAndRating_routes_1 = require('../modules/ReviewAndRating/ReviewAndRating.routes');
const addCart_routes_1 = require('../modules/addCart/addCart.routes');
const auth_routes_1 = require('../modules/auth/auth.routes');
const blog_routes_1 = require('../modules/blog/blog.routes');
const booking_routes_1 = require('../modules/booking/booking.routes');
const category_routes_1 = require('../modules/category/category.routes');
const faq_routes_1 = require('../modules/faq/faq.routes');
const feedback_routes_1 = require('../modules/feedback/feedback.routes');
const profile_routes_1 = require('../modules/profile/profile.routes');
const service_routes_1 = require('../modules/service/service.routes');
const user_routes_1 = require('../modules/user/user.routes');
const router = express_1.default.Router();
const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: auth_routes_1.AuthRoutes,
  },
  {
    path: '/users',
    route: user_routes_1.UserRoutes,
  },
  {
    path: '/profile',
    route: profile_routes_1.ProfileRoutes,
  },
  {
    path: '/categories',
    route: category_routes_1.CategoryRoutes,
  },
  {
    path: '/services',
    route: service_routes_1.ServiceRoutes,
  },
  {
    path: '/review-and-rating',
    route: ReviewAndRating_routes_1.ReviewAndRatingRoutes,
  },
  {
    path: '/bookings',
    route: booking_routes_1.BookingRoutes,
  },
  {
    path: '/add-carts',
    route: addCart_routes_1.AddCartRoutes,
  },
  {
    path: '/feedbacks',
    route: feedback_routes_1.FeedbackRoutes,
  },
  {
    path: '/blogs',
    route: blog_routes_1.BlogRoutes,
  },
  {
    path: '/faqs',
    route: faq_routes_1.FAQRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
