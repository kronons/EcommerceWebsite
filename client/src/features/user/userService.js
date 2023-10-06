import axios from "axios";
import { base_url }  from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";



const register = async(userData) => {

    const response = await axios.post( `${base_url}user/register`, userData )
    if(response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    } 
};

const login = async(userData) => {

    const response = await axios.post( `${base_url}user/login`, userData )
    if(response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data));
        config.headers.Authorization = `Bearer ${response.data.token}`;
        // // Log the config object to the console
        // console.log("Config headers:", config.headers);
        return response.data;
    } 
};

const logout = async () => {
    try {
      const response = await axios.get(`${base_url}user/logout`, config);
      if(response.data){
        return response.data;
      }
  
    } 
    catch (error) {
      // Handle errors, if any
      console.error(error);
      throw error; // Re-throw the error to be caught by the caller, if necessary
    }
  };

const addToWishList = async (prodId) => {

    try {
        const response = await axios.put(`${base_url}user/wishlist`, {prodId}, config);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
    }
};

const getUserWishList = async() => {

    const response = await axios.get( `${base_url}user/wishlist`, config ) 
    if(response.data){
        return response.data;
    }
};

const addAndUpdateCart = async(cartData) => {

    const response = await axios.put( `${base_url}user/cart`, cartData, config ) 
    if(response.data){
        return response.data;
    }
}

const getCart = async() => {

    const response = await axios.get( `${base_url}user/cart`, config ) 
    if(response.data){
        return response.data;
    }
}

const removeProductFromCart = async (id) => {
    
    const response = await axios.delete(`${base_url}user/cart-remove-product/${id}`, config);
        if (response.data) {
            return response.data;
        }
}

const emptyCart = async (cartId) => {
    
    const response = await axios.delete(`${base_url}user/cart-empty/${cartId}`, config);
        if (response.data) {
            return response.data;
        }
}

const updateProductQuantityFromCart = async (cartItemId, quantity) => {

    try {
        const response = await axios.delete(`${base_url}user/cart-update-quantity/${cartItemId}/${quantity}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const createOrder = async(orderDetail) => {

    const response = await axios.post(`${base_url}user/cart/create-order`, orderDetail ,config);
    if (response.data) {
        return response.data;
    }

}

const getUserOrders = async () => {
    const response = await axios.get(`${base_url}user/get-my-orders`, config);
    if(response.data) {
        return response.data;
    }
}

const updateUser = async(data) => {
    const response = await axios.put(`${base_url}user/edit-user`, data, config);
    if(response.data) {
        return response.data;
    }
}

const forgotPasswordToken = async(data) => {
    const response = await axios.post(`${base_url}user/forgot-password-token`, data);
    if(response.data) {
        return response.data;
    }
}

const resetPassword = async(data) => {

    const response = await axios.put(`${base_url}user/reset-password/${data.token}`, {password: data.password})
    if(response.data) {
        return response.data;
    }
}

export const authService = {
    register,
    login,
    logout,
    addToWishList,
    getUserWishList,
    addAndUpdateCart,
    getCart,
    removeProductFromCart,
    emptyCart,
    updateProductQuantityFromCart,
    createOrder,
    getUserOrders,
    updateUser,
    forgotPasswordToken,
    resetPassword,
};