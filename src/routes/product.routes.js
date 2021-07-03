import { Router } from 'express';
import Product from '../controllers/ProductController';
import TokenHelper from '../helpers/Token';
// import validator from '../middlewares/validator';

const productRoute = Router();

productRoute.post('/create', TokenHelper.verifyToken, Product.create);

productRoute.get('/all', TokenHelper.verifyToken, Product.getAllProducts);

productRoute.get(
  '/available_location',
  TokenHelper.verifyToken,
  Product.getProductWithLocation
);

export default productRoute;
