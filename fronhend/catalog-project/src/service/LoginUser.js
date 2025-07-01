import { API_LOGIN, API_REGISTER } from "./DataApi";
import axios from "axios";

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(API_LOGIN, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.data); // Store token in localStorage
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const registerUser = async (name, email, password, address) => {
  try {
    const response = await axios.post(API_REGISTER, {
      name,
      address,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export { loginUser, registerUser };
