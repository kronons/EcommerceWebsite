import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const getProduct = async(id) => {
    const response = await axios.get(`${base_url}product/${id}`)
    if(response.data) {
        return response.data;
    } 
}

const getProducts = async() => {
    const response = await axios.get(`${base_url}product/`)
    if(response.data) {
        return response.data;
    } 
}

const rateProduct = async(data) => {
    const response = await axios.put(`${base_url}product/rating`, data, config)
    if(response.data) {
        return response.data;
    } 
}

export const productService = {
    getProduct,
    getProducts,
    rateProduct,
}