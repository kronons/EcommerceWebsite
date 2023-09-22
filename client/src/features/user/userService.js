import axios from "axios";
import { base_url }  from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";



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
        localStorage.setItem("user", JSON.stringify(response.data));
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

const addToCart = async(cartData) => {
    const response = await axios.post( `${base_url}user/cart`, cartData, config ) 
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

const updateCart = async(cartData) => {
    const response = await axios.put( `${base_url}user/cart-update`, cartData, config ) 
    if(response.data){
        return response.data;
    }
}

export const authService = {
    register,
    login,
    addToWishList,
    getUserWishList,
    addToCart,
    getCart,
    updateCart,
};