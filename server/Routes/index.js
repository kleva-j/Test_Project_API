import express from 'express';
import ProductController from '../Controllers';
import CacheMiddleware from '../Middlewares';

const { getAllProducts, getSingleProduct } = ProductController;

const productRouter = express.Router();

productRouter.route('/products')
  .get(CacheMiddleware(60), getAllProducts);

productRouter.route('/products/:productId')
  .get(CacheMiddleware(60), getSingleProduct);

export default productRouter;
