import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from "../../utils/axiosconfig";


const getProductCategory = async(id) => {
    const response = await axios.get(`${base_url}productCategory/${id}`, config);

    return response.data;
};

const getProductCategories = async() => {
    const response = await axios.get(`${base_url}productCategory/`);

    return response.data;
};

const createProductCategories = async(category) => {
    const response = await axios.post(`${base_url}productCategory/`, category, config);

    return response.data;
};

const updateProductCategories = async(category) => {
    const response = await axios.put(`${base_url}productCategory/${category.id}`,{title: category.categoryData.title}, config);

    return response.data;
};

const deleteProductCategory = async (id) => {
    const response = await axios.delete(`${base_url}productCategory/${id}`, config);

    return response.data;
};

const pCategoryService = {
    getProductCategory,
    getProductCategories,
    createProductCategories,
    updateProductCategories,
    deleteProductCategory,
};

export default pCategoryService;