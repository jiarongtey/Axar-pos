import axios from "axios";
import M from "materialize-css";
import { GET_ERRORS } from "./types";

// Get all product
export const getProducts = async () => {
  return axios.get("/api/products");
};

// Remove product
export const removeProduct = async product => {
  M.toast({
    html: `Successfully removed ${product.name}`,
    classes: "rounded remove-toast",
  });
  return axios.post(`/api/products/remove/${product._id}`);
};

// New Product
export const addNewProduct = (productData, history) => dispatch => {
  axios
    .post("/api/products/new", productData)
    .then(res => {
      history.push("/admin/dashboard");
      M.toast({
        html: "Successfully created a new product!",
        classes: "rounded register-toast",
      });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const updateProduct = (product, updateData) => {
  axios.post(`/api/products/update/${product._id}`, updateData).then(res => {
    M.toast({
      html: `Successfully updated ${product.name}!`,
      classes: "rounded register-toast",
    });
  });
};
