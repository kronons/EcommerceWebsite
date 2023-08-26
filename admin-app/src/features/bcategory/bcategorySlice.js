import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";


export const getBlogCategory = createAsyncThunk('blogCategory/get-category', async ( id, thunkAPI ) => {
    try{
        return await bCategoryService.getBlogCategory(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getBlogCategories = createAsyncThunk('blogCategory/get-categories', async ( thunkAPI ) => {
    try{
        return await bCategoryService.getBlogCategories();
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlogCategories = createAsyncThunk('blogCategory/create-categories', async ( bCatData, thunkAPI ) => {
    try{
        return await bCategoryService.createBlogCategories(bCatData);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateBlogCategory = createAsyncThunk('blogCategory/update-category', async (bCat, thunkAPI) => {
    try {
        return await bCategoryService.updateBlogCategory(bCat);
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteABlogCategory = createAsyncThunk('blogCategory/delete-category', async (id, thunkAPI) => {
    try{
        return await bCategoryService.deleteBlogCategory(id);
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
        .addCase(getBlogCategory.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(getBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.bCategoryName = action.payload.title;
        })
        .addCase(getBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
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
        .addCase(updateBlogCategory.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(updateBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBCategory = action.payload;
        })
        .addCase(updateBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteABlogCategory.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(deleteABlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedABCategory = action.payload;
        })
        .addCase(deleteABlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);
    },
});

export default bCategorySlice.reducer;