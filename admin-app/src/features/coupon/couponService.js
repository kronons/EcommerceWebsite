import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from "../../utils/axiosconfig";


const getCoupon = async(id) => {
    const response = await axios.get(`${base_url}coupon/${id}`);

    return response.data;
};

const getCoupons = async() => {
    const response = await axios.get(`${base_url}coupon/`);

    return response.data;
};

const createCoupons = async(coupon) => {
    const response = await axios.post(`${base_url}coupon/`, coupon, config);

    return response.data;
};

const updateCoupon = async(coupon) => {
    const response = await axios.put(`${base_url}coupon/${coupon.id}`, coupon, config);

    return response.data;
};

const deleteCoupon = async (id) => {
    const response = await axios.delete(`${base_url}coupon/${id}`, config);

    return response.data;
};

const couponService = {
    getCoupon,
    getCoupons,
    createCoupons,
    updateCoupon,
    deleteCoupon,
};

export default couponService;