import axios from "axios";
import M from "materialize-css";

// Get all product
export const getOrders = async () => {
  return axios.get("/api/orders");
};

// New Product
export const addNewProduct = productData => {
  axios
    .post("/api/orders/new", productData)
    .then(res => {
      M.toast({
        html: "Successfully placed order!",
        classes: "rounded register-toast",
      });
    })
    .catch(err => console.log(err));
};

// Cancel order
export const cancelOrder = async order => {
  M.toast({
    html: `Successfully removed order for ${order.reseller}`,
    classes: "rounded remove-toast",
  });
  return axios.post(`/api/orders/remove/${order._id}`);
};

// Approve Order
export const approveOrder = orderData => {
  axios
    .post("/api/orders/approve", orderData)
    .then(res => {
      M.toast({
        html: "Successfully approved order!",
        classes: "rounded register-toast",
      });
    })
    .catch(err => {
      M.toast({
        html: "Order is canceled due to limited stock",
        classes: "rounded register-toast",
      });
    });
};
