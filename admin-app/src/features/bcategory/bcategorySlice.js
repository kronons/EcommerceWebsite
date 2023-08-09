import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";


export const getBlogCategories = createAsyncThunk('blogCategory/get-categories', async ( thunkAPI ) => {
    try{
        return await bCategoryService.getBlogCategories();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

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
        });
    },
});

export default bCategorySlice.reducer;