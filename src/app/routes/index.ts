import express from 'express';
import { ReviewAndRatingRoutes } from '../modules/ReviewAndRating/ReviewAndRating.routes';
import { AddCartRoutes } from '../modules/addCart/addCart.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';
import { ProfileRoutes } from '../modules/profile/profile.routes';
import { ServiceRoutes } from '../modules/service/service.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/review-and-rating',
    route: ReviewAndRatingRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/add-carts',
    route: AddCartRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
