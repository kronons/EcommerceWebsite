import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

const getCustomerFromLocalStorage = localStorage.getItem("customer")
    ?   JSON.parse(localStorage.getItem("customer"))
    :   null;

export const registerUser = createAsyncThunk("user/register", async ( userData, thunkAPI ) => {
    try{
        return await authService.register(userData);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    } 
});

export const loginUser = createAsyncThunk("user/login", async ( userData, thunkAPI ) => {
    try{
        return await authService.login(userData);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToWishList = createAsyncThunk("auth/addWishlist", async ( prodId, thunkAPI ) => {
    try{
        return await authService.addToWishList(prodId);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getWishList = createAsyncThunk("user/getWishlist", async ( thunkAPI ) => {
    try{
        return await authService.getUserWishList();
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }  
});

export const getUserCart = createAsyncThunk("user/cart/get", async ( thunkAPI ) => {
    try{
        return await authService.getCart();
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addAndUpdateACart = createAsyncThunk("user/cart/update", async ( cartData, thunkAPI ) => {
    try{
        return await authService.addAndUpdateCart(cartData);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const removeAProductFromCart  = createAsyncThunk("user/cart/remove", async ( id, thunkAPI ) => {

    try{
        return await authService.removeProductFromCart(id);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateAProductQuantityFromCart  = createAsyncThunk("user/cart/update/quantity", async ({ cartItemId, quantity }, thunkAPI ) => {
    console.log("UserSlice quantity for cart item:", cartItemId, "to quantity:", quantity);
    try{
        return await authService.updateProductQuantityFromCart(cartItemId, quantity);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const authslice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdUser = action.payload;
            if(state.isSuccess === true) {
                toast.info("User Created Successfully");
            }
        })
        .addCase(registerUser.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
                toast.error(action.error);
            }
        })
        .addCase(loginUser.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if(state.isSuccess === true) {
                localStorage.setItem("token", action.payload.token);
                toast.info("User Logged In Successfully");
            }
        })
        .addCase(loginUser.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
                toast.error("Error Logging In. Try Again");
            }
        })
        .addCase(addToWishList.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(addToWishList.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        })
        .addCase(addToWishList.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
                toast.error(action.error);
            }
        })
        .addCase(getWishList.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getWishList.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        })
        .addCase(getWishList.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
                toast.error(action.error);
            }
        })
        .addCase(addAndUpdateACart.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(addAndUpdateACart.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cart = action.payload;
            if(state.isSuccess) {
                toast.success("Product Added To Cart Successfully")
            }
        })
        .addCase(addAndUpdateACart.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
                toast.error(action.error);
            }
        })
        .addCase(getUserCart.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getUserCart.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cart = action.payload;
        })
        .addCase(getUserCart.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
                toast.error(action.error);
            }
        })
        .addCase(removeAProductFromCart.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(removeAProductFromCart.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cart = action.payload;
            if (state.isSuccess) {
                toast.success("Product Removed From Cart Successfully")
            }
        })
        .addCase(removeAProductFromCart.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
                toast.error(action.error);
            }
        })
        .addCase(updateAProductQuantityFromCart.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(updateAProductQuantityFromCart.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cart = action.payload;
            if (state.isSuccess) {
                toast.success("Updated Quantity Successfully")
            }
        })
        .addCase(updateAProductQuantityFromCart.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true) {
                toast.error(action.error);
            }
        })
    }
})


export default authslice.reducer;