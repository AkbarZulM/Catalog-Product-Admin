import { prismaClient } from "../database/application.js";
import {
  registerValidate,
  loginValidate,
} from "../../validations/authValidation.js";
import { validation } from "../../validations/validation.js";
import { signToken, verifyToken } from "../jwt/helpres.js";
import { ResponseError } from "../../error/responses-error.js";
import bcrypt from "bcrypt";
const registerService = async (request) => {
  const validatedData = validation(registerValidate, request);

  const userExists = await prismaClient.user.findUnique({
    where: { email: validatedData.email },
  });

  if (userExists) {
    throw new ResponseError(400, "User already exists");
  }

  let data = {
    name: validatedData.name,
    email: validatedData.email,
    password: await bcrypt.hash(validatedData.password, 10),
    address: validatedData.address,
    role: validatedData.role,
  };

  const user = await prismaClient.user.create({ data: data });

  return user;
};

const loginService = async (request) => {
  const validatedData = validation(loginValidate, request);

  const user = await prismaClient.user.findUnique({
    where: { email: validatedData.email },
  });

  if (!user) {
    throw new ResponseError(404, "Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(
    validatedData.password,
    user.password
  );

  if (!passwordMatch) {
    throw new ResponseError(401, "Invalid credentials");
  }

  const token = signToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return token;
};

const logoutService = async (token) => {
  try {
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      throw new ResponseError(401, "Invalid token");
    }

    return {
      message: "User logged out successfully",
      userId: decodedToken.id,
    };
  } catch (err) {
    throw new ResponseError(401, "Invalid token: " + err.message);
  }
};

export default { registerService, loginService, logoutService };
