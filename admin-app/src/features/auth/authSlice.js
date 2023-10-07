import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getUserFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')) 
    : null

const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const login = createAsyncThunk('auth/admin-login', async ( user, thunkAPI ) => {

    try{
        return await authService.login(user);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrderByUser = createAsyncThunk('user/get-Order-By-User', async ( id, thunkAPI ) => {
    try{
        return await authService.getOrder(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk('user/get-all-orders', async ( thunkAPI ) => {
    try{
        return await authService.getOrders();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_All");

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
            state.isSuccess = true;
            state.user = action.payload;
            if(state.isSuccess) {
                toast.success("Logged In Successfully")
            }
        })
        .addCase(login.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null;
            if(!state.isSuccess) {
                toast.success("Unable To Login. Try Again.")
            }
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
            state.message = action.payload.message;
        })
        .addCase(getOrderByUser.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getOrderByUser.fulfilled, ( state, action ) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = true;
            state.orderbyuser = action.payload;
            state.message = "success";
        })
        .addCase(getOrderByUser.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;