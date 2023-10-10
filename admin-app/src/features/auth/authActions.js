import { getAMonthlyStats, getAYearlyStats, getOrders } from '../auth/authSlice';
import { setMonthlyData, setYearlyData, setOrders } from '../auth/authSlice';

export const fetchMonthlyData = () => async (dispatch) => {
  try {
    const data = await getAMonthlyStats();
    dispatch(setMonthlyData(data));
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

export const fetchYearlyData = () => async (dispatch) => {
  try {
    const data = await getAYearlyStats();
    dispatch(setYearlyData(data));
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

export const fetchOrdersData = () => async (dispatch) => {
  try {
    const data = await getOrders();
    dispatch(setOrders(data));
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};