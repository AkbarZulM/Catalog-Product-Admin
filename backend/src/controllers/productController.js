import Products from "../utils/services/servicesProducts.js";

const getAll = async (req, res, next) => {
  try {
    const products = await Products.getProducts();
    res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await Products.getProductId(req.params.id);
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const product = await Products.createProduct(req.body, req.file);
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    const product = await Products.updateProduct(
      req.params.id,
      req.body,
      req.file
    );
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const product = await Products.deleteProduct(req.params.id);
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const product = await Products.searchProduct(keyword);
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById, post, put, remove, search };
