import axios from "axios";
import { base_url }  from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";



const register = async(userData) => {
    const response = await axios.post( `${base_url}user/register`, userData )
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } 
};

const login = async(userData) => {
    const response = await axios.post( `${base_url}user/login`, userData )
    if(response.data) {
        // Comment Out For Now -> Save the user data to local storage
        //localStorage.setItem("user", JSON.stringify(response.data));
        config.headers.Authorization = `Bearer ${response.data.token}`;
        // // Log the config object to the console
        // console.log("Config headers:", config.headers);
        return response.data;
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
    
    const response = await axios.delete(`${base_url}user/remove-product/${id}`, config);
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

export const authService = {
    register,
    login,
    addToWishList,
    getUserWishList,
    addAndUpdateCart,
    getCart,
    removeProductFromCart,
    updateProductQuantityFromCart,
};