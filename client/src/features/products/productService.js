import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";


const getProduct = async(id) => {
    const response = await axios.get(`${base_url}product/${id}`)
    if(response.data) {
        return response.data;
    } 
}

const getProducts = async(data) => {

    const queryParams = 
        (data?.brand ? `brand=${data?.brand}&&` : "") +
        (data?.tag ? `tags=${data?.tag}&&` : "") +
        (data?.category ? `category=${data?.category}&&` : "") +
        (data?.minPrice ? `price[gte]=${data?.minPrice}&&` : "") +
        (data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : "") +
        (data?.sort ? `sort=${data?.sort}&&` : "")
        ;

    const url = `${base_url}product?${queryParams}`;

    const response = await axios.get(url, data);

    if (response.data) {
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