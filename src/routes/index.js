import { Router } from 'express';
import authRoute from './auth.routes';
import commentRoute from './comment.routes';
import productRoute from './product.routes';

const router = Router();

router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/comment', commentRoute);

export default router;
