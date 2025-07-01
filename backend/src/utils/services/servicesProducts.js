import { prismaClient } from "../database/application.js";
import { ResponseError } from "../../error/responses-error.js";
import {
  getProduct,
  createProductValidation,
  updateProductValidation,
} from "../../validations/productValidation.js";
import { validation } from "../../validations/validation.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Buat __dirname manual (karena ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getProducts = async () => {
  const Products = await prismaClient.product.findMany({});

  if (Products.length === 0) {
    throw new ResponseError(404, "Products not found");
  }

  return Products;
};

const getProductId = async (id) => {
  const validated = getProduct.validate(id);

  if (validated.error) {
    throw new ResponseError(400, "Invalid ID");
  }

  const product = await prismaClient.product.findUnique({
    where: { id: validated.value },
  });

  if (!product) {
    throw new ResponseError(404, "Product not found");
  }

  return product;
};

const createProduct = async (request, file) => {
  const validationProduct = validation(createProductValidation, request);

  if (validationProduct.error) {
    throw new ResponseError(400, validationProduct.error.message);
  }

  let imageUrl = null;

  // Memeriksa tipe gambar jika ada file
  if (file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new ResponseError(
        400,
        "Only image files (jpg, png, webp) are allowed!"
      );
    }

    imageUrl = `/images/${file.filename}`;
  }

  const product = await prismaClient.product.create({
    data: { ...validationProduct, img: imageUrl },
  });

  return product;
};

const updateProduct = async (id, request, file) => {
  const validated = validation(getProduct, id);

  // Memastikan ID valid
  if (validated.error) {
    throw new ResponseError(400, "Invalid ID");
  }

  const validateData = validation(updateProductValidation, request);

  // Memastikan data valid
  if (validateData.error) {
    throw new ResponseError(400, "Invalid data validation");
  }

  let imageUrl = null;

  // Memeriksa tipe gambar jika ada file
  if (file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new ResponseError(
        400,
        "Only image files (jpg, png, webp) are allowed!"
      );
    }

    imageUrl = `/images/${file.filename}`;
  }

  const dataToUpdate = {
    ...validateData,
  };

  // Cek apakah ada gambar sebelumnya yang harus dihapus
  const oldProduct = await prismaClient.product.findUnique({
    where: { id: validated },
  });

  if (oldProduct?.img && oldProduct.img !== imageUrl) {
    const oldImgPath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "images",
      oldProduct.img
    );

    if (fs.existsSync(oldImgPath)) {
      fs.unlinkSync(oldImgPath);
      console.log("Gambar lama dihapus:", oldImgPath);
    } else {
      console.log("File gambar lama tidak ditemukan:", oldImgPath);
    }
  }

  // Memperbarui data gambar jika ada file baru
  if (file) {
    dataToUpdate.img = imageUrl;
  }

  const product = await prismaClient.product.update({
    where: { id: validated },
    data: dataToUpdate,
  });

  return product;
};

const deleteProduct = async (id) => {
  const validated = validation(getProduct, id);

  if (validated.error) {
    throw new ResponseError(400, "Invalid ID");
  }

  try {
    const product = await prismaClient.product.delete({
      where: { id: validated },
    });
    return product;
  } catch (error) {
    throw new ResponseError(400, "Invalid");
  }
};

const searchProduct = async (query) => {
  if (!query || query.trim() === "") {
    throw new ResponseError(400, "Search query is required");
  }

  const products = await prismaClient.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive", // tidak case sensitive
      },
    },
  });

  if (products.length === 0) {
    throw new ResponseError(404, "Products not found");
  }

  return products;
};

export default {
  getProducts,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
