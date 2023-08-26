import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from "../../utils/axiosconfig";


const getBlogCategory = async(id) => {
    const response = await axios.get(`${base_url}blogCategory/${id}`);

    return response.data;
};

const getBlogCategories = async() => {
    const response = await axios.get(`${base_url}blogCategory/`);

    return response.data;
};

const createBlogCategories = async(bCat) => {
    const response = await axios.post(`${base_url}blogCategory/`, bCat, config);

    return response.data;
};

const updateBlogCategory = async(bCat) => {
    const response = await axios.put(`${base_url}blogCategory/${bCat.id}`,{title: bCat.bCatData.title}, config);

    return response.data;
};

const deleteBlogCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogCategory/${id}`, config);

    return response.data;
};

const bCategoryService = {
    getBlogCategory,
    getBlogCategories,
    createBlogCategories,
    updateBlogCategory,
    deleteBlogCategory,
};

export default bCategoryService;