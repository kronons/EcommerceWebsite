import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";


export const uploadImg = createAsyncThunk('upload/upload-images', async (data, thunkAPI) => {

    try {
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
            formData.append("images", data[i]);
        }
        return await uploadService.uploadImg(formData);
    } catch (error) {
        // Extract relevant error information for serializable payload
        const serializableError = {
            message: error.message,
            name: error.name,
            code: error.code
        };
        return thunkAPI.rejectWithValue(serializableError);
    }
});

export const deleteImg = createAsyncThunk('delete/images', async (id, thunkAPI) => {
    try {
        return await uploadService.deleteImg(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetImageState = createAction("Reset_Images");

const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(uploadImg.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(uploadImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = action.payload;
        })
        .addCase(uploadImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteImg.pending, (state) => {
            state.isLoading = true;
        })        
        .addCase(deleteImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.images = [];
        })
        .addCase(deleteImg.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
        .addCase(resetImageState, (state) => {
            state.images = [];
        });
    },
});

export default uploadSlice.reducer;