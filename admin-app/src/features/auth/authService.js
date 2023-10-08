import axios from 'axios';
import { config } from "../../utils/axiosconfig";
import { base_url } from '../../utils/base_url';


const login = async(user) => {

    const response = await axios.post(`${base_url}user/admin-login`,user);
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const getOrder = async(id) => {

    const response = await axios.post(`${base_url}user/get-order-by-order-id/${id}`, "", config);

    return response.data;
};

const getOrders = async() => {

    const response = await axios.get(`${base_url}user/get-all-orders`, config);

    return response.data;
};

const updateOrder = async(id, status) => {

    const response = await axios.put(`${base_url}user/order/update-order/${id}`, {status: status}, config);

    return response.data;
};

const getMonthlyStats = async() => {

    const response = await axios.get(`${base_url}user/get-monthly-statistics`, config);

    return response.data;
};

const getYearlyStats = async() => {

    const response = await axios.get(`${base_url}user/get-yearly-statistics`, config);

    return response.data;
};

const authService = {
    login,
    getOrder,
    getOrders,
    updateOrder,
    getMonthlyStats,
    getYearlyStats,
};

export default authService;