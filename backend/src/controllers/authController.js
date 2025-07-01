import Auth from "../utils/services/servicesAuth.js";

const register = async (req, res, next) => {
  try {
    const user = await Auth.registerService(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await Auth.loginService(req.body);
    res.status(200).json({ data: token });
  } catch (error) {
    next(error);
  }
};

// controllers/auth-controller.js
const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await Auth.logoutService(token);

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Logout Error:", error);
    next(error);
  }
};

export default { register, login, logout };
