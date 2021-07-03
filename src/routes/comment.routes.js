import { Router } from 'express';
import Comments from '../controllers/Comments';
import TokenHelper from '../helpers/Token';

const commentRoute = Router();

commentRoute.post(
  '/create/:productId',
  TokenHelper.verifyToken,
  Comments.create
);

commentRoute.get(
  '/:productId',
  TokenHelper.verifyToken,
  Comments.getAllCommentInProduct
);

commentRoute.post(
  '/reply/:commentId',
  TokenHelper.verifyToken,
  Comments.createCommentReply
);

export default commentRoute;
