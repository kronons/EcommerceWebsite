import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async() => {
    const response = await axios.get(`${base_url}product/`)
    if(response.data) {
        return response.data;
    } 
}

const addToWishList = async(prodId) => {
    try{
       
        const response = await axios.put(`${base_url}product/wishlist`, { prodId }, config)
        if(response.data) {
            return response.data;
        } 
    }
    catch (error) {
        // Handle the error
        console.error("Error adding to wishlist:", error);
    }
}


export const productService = {
    getProducts,
    addToWishList,
}