import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";


export const getACoupon = createAsyncThunk('product/get-coupon', async ( id, thunkAPI ) => {
    try{
        return await couponService.getCoupon(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getCoupons = createAsyncThunk('coupon/get-coupons', async ( thunkAPI ) => {
    try{
        return await couponService.getCoupons();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createCoupons = createAsyncThunk('coupon/create-coupons', async ( couponData, thunkAPI ) => {
    try{
        return await couponService.createCoupons(couponData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateACoupon = createAsyncThunk('coupon/update-coupon', async ( couponData, thunkAPI ) => {
    try{
        return await couponService.updateCoupon(couponData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteACoupon = createAsyncThunk('coupon/delete-coupon', async (id, thunkAPI) => {
    try{
        return await couponService.deleteCoupon(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_All");


const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getACoupon.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(getACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.coupons = action.payload;
        })
        .addCase(getACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getCoupons.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(getCoupons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.coupons = action.payload;
        })
        .addCase(getCoupons.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error.message;
        })
        .addCase(createCoupons.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(createCoupons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCoupon = action.payload;
        })
        .addCase(createCoupons.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateACoupon.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(updateACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;

            // Find the index of the coupon in the state array
            const updatedIndex = state.coupons.findIndex(
                (coupon) => coupon._id === action.payload._id
            );

            // Replace the old coupon with the updated coupon in the state array
            if (updatedIndex !== -1) {
                state.coupons[updatedIndex] = action.payload;
            }
            state.updatedCoupon = action.payload;
        })
        .addCase(updateACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteACoupon.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(deleteACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCoupon = action.payload;
        })
        .addCase(deleteACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});

export default couponSlice.reducer;