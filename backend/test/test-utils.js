import { prismaClient } from "../src/utils/database/application";
import bcrypt from "bcrypt";
import { signToken } from "../src/utils/jwt/helpres";

export const createProduct = async () => {
  const product = await prismaClient.product.create({
    data: { name: "test", desc: "test", price: 100, qty: 10, img: "test.jpg" },
  });
  return product;
};

export const deleteAllProducts = async () => {
  await prismaClient.product.deleteMany();
};

export const deleteAuth = async () => {
  await prismaClient.user.deleteMany({
    where: { email: "test@gmail.com" },
  });
};

export const createAdmin = async () => {
  const admin = await prismaClient.user.create({
    data: {
      name: "test",
      email: "test@gmail.com",
      password: await bcrypt.hash("test", 10),
      address: "test",
      role: "admin",
    },
  });

  return admin;
};
export const createAdminToken = async () => {
  const admin = await prismaClient.user.create({
    data: {
      name: "test",
      email: "test@gmail.com",
      password: await bcrypt.hash("test", 10),
      address: "test",
      role: "admin",
    },
  });

  const token = signToken(admin);

  return token;
};
