import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";


export const getBlogCategories = createAsyncThunk('blogCategory/get-categories', async ( thunkAPI ) => {
    try{
        return await bCategoryService.getBlogCategories();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlogCategories = createAsyncThunk('brand/create-categories', async ( bcatData, thunkAPI ) => {
    try{
        return await bCategoryService.createBlogCategories(bcatData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_All");

const initialState = {
    bCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const bCategorySlice = createSlice({
    name: "bCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBlogCategories.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(getBlogCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bCategories = action.payload;
        })
        .addCase(getBlogCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBlogCategories.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(createBlogCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBCategories = action.payload;
        })
        .addCase(createBlogCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});

export default bCategorySlice.reducer;