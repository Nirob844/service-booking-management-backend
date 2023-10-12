import express from 'express';
import { ReviewAndRatingRoutes } from '../modules/ReviewAndRating/ReviewAndRating.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
