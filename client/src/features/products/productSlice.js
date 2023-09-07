import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";


export const getAllProducts = createAsyncThunk("product/get-products", async ( thunkAPI ) => {
    try{
        return await productService.getProducts();
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
    
});

export const addToWishList = createAsyncThunk("product/wishlist", async ( prodId, thunkAPI ) => {
    try{
        return await productService.addToWishList(prodId);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
    
});


const productState = {
    product: [],
    wishList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        })
        .addCase(getAllProducts.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addToWishList.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(addToWishList.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishList = action.payload;
            state.message = "Product Added To Wishlist!"
        })
        .addCase(addToWishList.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})


export default productSlice.reducer;