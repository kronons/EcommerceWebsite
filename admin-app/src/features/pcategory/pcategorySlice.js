import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";


export const getProductCategories = createAsyncThunk('productCategory/get-categories', async ( thunkAPI ) => {
    try{
        return await pCategoryService.getProductCategories();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProductCategories = createAsyncThunk('productCategory/create-product-categories', async ( categoryData, thunkAPI ) => {
    try{
        return await pCategoryService.createProductCategories(categoryData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_All");

const initialState = {
    pCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const pCategorySlice = createSlice({
    name: "pCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProductCategories.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(getProductCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pCategories = action.payload;
        })
        .addCase(getProductCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createProductCategories.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(createProductCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCategories = action.payload;
        })
        .addCase(createProductCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});

export default pCategorySlice.reducer;