import JsonDB from '../Database/db.json';

const { products } = JsonDB;

const { log } = console;

export default class ProductController {
  static getAllProducts(req, res) {
    return res.status(200).json({
      status: 'Success',
      message: 'All Products',
      result: products,
    });
  }

  static getSingleProduct(req, res) {
    const { params: { productId } } = req;
    log(productId);
    const singleProduct = products.find((item) => item.id === +productId);
    return res.status(200).json({
      status: 'Success',
      message: 'Single Product',
      productId,
      result: singleProduct || {},
    });
  }
}
