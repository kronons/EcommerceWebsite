import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getUserFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) 
    : null

export const login = createAsyncThunk('auth/admin-login', async ( user, thunkAPI ) => {

    try{
        return await authService.login(user);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrderByOrderId = createAsyncThunk('auth/get-Order-By-Order-Id', async ( id, thunkAPI ) => {

    try{
        return await authService.getOrder(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk('auth/get-all-orders', async ( thunkAPI ) => {

    try{
        return await authService.getOrders();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateAOrder = createAsyncThunk('auth/update-orders', async ( {id, status}, thunkAPI ) => {

    try{
        return await authService.updateOrder(id, status);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAMonthlyStats = createAsyncThunk('auth/get-monthly-stats', async ( thunkAPI ) => {

    try{
        return await authService.getMonthlyStats();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAYearlyStats = createAsyncThunk('auth/get-yearly-stats', async ( thunkAPI ) => {

    try{
        return await authService.getYearlyStats();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_All");


const initialState = {
    user: getUserFromLocalStorage,
    monthlyData: null,
    yearlyData: null,
    orders: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers:(builder) => {builder
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false; 
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload ? action.payload.message : "Unknown error occurred";
            toast.error("Unable To Login. Try Again."); 
        })
        .addCase(getOrders.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getOrders.fulfilled, ( state, action ) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
            state.message = "success";
        })
        .addCase(getOrders.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
        .addCase(updateAOrder.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(updateAOrder.fulfilled, ( state, action ) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
            state.message = "success";
        })
        .addCase(updateAOrder.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message;
        })
        .addCase(getOrderByOrderId.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getOrderByOrderId.fulfilled, ( state, action ) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
            state.message = "success";
        })
        .addCase(getOrderByOrderId.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAMonthlyStats.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getAMonthlyStats.fulfilled, ( state, action ) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = true;
            state.monthlyData = action.payload;
            state.message = "success";
        })
        .addCase(getAMonthlyStats.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAYearlyStats.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getAYearlyStats.fulfilled, ( state, action ) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = true;
            state.yearlyData = action.payload;
            state.message = "success";
        })
        .addCase(getAYearlyStats.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;