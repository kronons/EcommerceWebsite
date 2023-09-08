import axios from "axios";
import { base_url } from "../../utils/base_url";


const getBlog = async(id) => {
    const response = await axios.get(`${base_url}blog/${id}`);
    if(response.data) {
        return response.data;
    } 
}

const getBlogs = async() => {
    const response = await axios.get(`${base_url}blog`);
    if(response.data) {
        return response.data;
    } 
}


export const blogService = {
    getBlog,
    getBlogs,
}