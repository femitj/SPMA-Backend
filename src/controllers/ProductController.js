import hashHelper from '../helpers/Hash';
import Response from '../helpers/Response';
import Product from '../database/models/product';
import User from '../database/models/users';

class ProductController {
  static async create(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId } = payload;

      const newProduct = new Product({
        ...req.body,
        price: `${Number(req.body.price).toFixed(2)}`,
        userId,
        status: 'active',
      });
      const product = await newProduct.save();

      if (!product) {
        const response = new Response(false, 400, 'Something went wrong');
        return res.status(response.code).json(response);
      }

      const response = new Response(
        true,
        201,
        'Successfully created product',
        product
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await Product.find().populate({
        path: 'userId',
        select: 'firstName lastName email id status',
      });

      if (!products.length) {
        const response = new Response(false, 400, 'No product found');
        return res.status(response.code).json(response);
      }

      const response = new Response(
        true,
        200,
        'Successfully retreived',
        products
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async getProductWithLocation(req, res) {
    try {
      const { payload } = req.payload;
      const { lga } = payload;

      const products = await Product.find({ lga }).populate({
        path: 'userId',
        select: 'firstName lastName email id status',
      });

      if (!products.length) {
        const response = new Response(false, 400, 'No product found');
        return res.status(response.code).json(response);
      }

      const response = new Response(
        true,
        200,
        'Successfully retreived',
        products
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async myProducts(req, res) {
    try {
      const { payload } = req.payload;
      const { id: userId } = payload;

      const products = await Product.find({ userId }).populate({
        path: 'userId',
        select: 'firstName lastName email id status',
      });

      if (!products.length) {
        const response = new Response(false, 400, 'No product found');
        return res.status(response.code).json(response);
      }

      const response = new Response(
        true,
        200,
        'Successfully retreived',
        products
      );
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new Response(
        false,
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }
}

export default ProductController;
