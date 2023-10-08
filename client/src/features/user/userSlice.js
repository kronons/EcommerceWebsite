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

export const logoutUser = createAsyncThunk("user/logout", async ( thunkAPI ) => {
    try{
        return await authService.logout();
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

export const emptyCart  = createAsyncThunk("user/cart/empty", async ( cartId, thunkAPI ) => {

    try{
        return await authService.emptyCart(cartId);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateAProductQuantityFromCart  = createAsyncThunk("user/cart/update/quantity", async ({ cartItemId, quantity }, thunkAPI ) => {

    try{
        return await authService.updateProductQuantityFromCart(cartItemId, quantity);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createAOrder  = createAsyncThunk("user/cart/create-order", async ( orderDetail, thunkAPI ) => {

    try{
        return await authService.createOrder(orderDetail);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders  = createAsyncThunk("user/order/get", async ( thunkAPI ) => {

    try{
        return await authService.getUserOrders();
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateAUser  = createAsyncThunk("user/profile/update", async ( userData, thunkAPI ) => {

    try{
        return await authService.updateUser(userData);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const forgotAPasswordToken = createAsyncThunk("user/password/token", async ( data, thunkAPI ) => {

    try{
        return await authService.forgotPasswordToken(data);
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetAPassword = createAsyncThunk("user/password/reset", async ( data, thunkAPI ) => {

    try{
        return await authService.resetPassword(data);
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
            if(state.isSuccess) {
                toast.info("User Created Successfully");
            }
        })
        .addCase(registerUser.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
                toast.error("Cannot Register Account, Please Try Again.");
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
            if(state.isSuccess) {
                localStorage.setItem("token", action.payload.token);
                toast.info("User Logged In Successfully");
            }
        })
        .addCase(loginUser.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message;
            if(state.isError) {
                toast.error("Incorrect Login, Try again");
            }
        })
        .addCase(logoutUser.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = null;
            if(state.isSuccess) {
                toast.info("User Logged Out Successfully");
            }
        })
        .addCase(logoutUser.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
                toast.error("Error Logging Out. Try Again");
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
            if(state.isError) {
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
            if(state.isError) {
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
            if(state.isError) {
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
            if(state.isError) {
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
            if(state.isError) {
                toast.error(action.error);
            }
        })
        .addCase(emptyCart.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(emptyCart.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cart = action.payload;
            if (state.isSuccess) {
                toast.success("Cart Emptied Successfully")
            }
        })
        .addCase(emptyCart.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
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
            if(state.isError) {
                toast.error(action.error);
            }
        })
        .addCase(createAOrder.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(createAOrder.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.orderedProduct = action.payload;
            if (state.isSuccess) {
                toast.success("Ordered Successfully")
            }
        })
        .addCase(createAOrder.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
                toast.error(action.error);
            }
        })
        .addCase(getOrders.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(getOrders.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.getorderedProduct = action.payload;
        })
        .addCase(getOrders.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateAUser.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(updateAUser.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedUser = action.payload;
            if(state.isSuccess) {
                localStorage.setItem("customer", JSON.stringify(state.updatedUser));
                toast.success("Profile Updated Successfully");
            }
        })
        .addCase(updateAUser.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
                toast.error("Error Updating Profile. Try Again");
            }
        })
        .addCase(forgotAPasswordToken.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(forgotAPasswordToken.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.passwordToken = action.payload;
            if(state.isSuccess) {
                toast.success("Forgot Password Email Sent Successfully");
            }
        })
        .addCase(forgotAPasswordToken.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
                toast.error("Forgot Password Sent Unsuccessfully. Try Again");
            }
        })
        .addCase(resetAPassword.pending, ( state ) => {
            state.isLoading = true;
        })
        .addCase(resetAPassword.fulfilled, ( state, action ) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pass = action.payload;
            if(state.isSuccess) {
                toast.success("Reset Password Successfull");
            }
        })
        .addCase(resetAPassword.rejected, ( state, action ) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError) {
                toast.error("Forgot Password Reset Unsuccessfull. Try Again");
            }
        })
    }
})


export default authslice.reducer;