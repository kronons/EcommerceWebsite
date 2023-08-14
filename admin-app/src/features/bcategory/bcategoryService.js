import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async() => {
    const response = await axios.get(`${base_url}blogCategory/`);

    return response.data;
};

const createBlogCategories = async(bcat) => {
    const response = await axios.post(`${base_url}blogCategory/`, bcat, config);

    return response.data;
};

const bCategoryService = {
    getBlogCategories,
    createBlogCategories
};

export default bCategoryService;