import { API_PRODUCT } from "./DataApi";
import axios from "axios";
import { getToken } from "../utils/TokenUtils.js"; // Assuming you have a utility to get the token
export const getProducts = async () => {
  try {
    const response = await axios.get(API_PRODUCT);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    const response = await axios.post(API_PRODUCT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("Product created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, formData) => {
  try {
    const response = await axios.put(`${API_PRODUCT}/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("Product updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_PRODUCT}/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("Product deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
