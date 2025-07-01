import jwt from "jsonwebtoken";
import { ResponseError } from "../../error/responses-error.js";

const SECRET_KEY = process.env.JWT_SECRET;

function signToken(user) {
  if (!SECRET_KEY) {
    throw new ResponseError(500, "JWT secret key not found");
  }

  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

function verifyToken(token) {
  if (!SECRET_KEY) {
    throw new ResponseError(500, "JWT secret key not found");
  }

  if (!token) {
    throw new ResponseError(401, "Token not found");
  }

  return jwt.verify(token, SECRET_KEY);
}

export { signToken, verifyToken };
