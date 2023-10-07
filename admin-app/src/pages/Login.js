import React from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from "../features/auth/authSlice";


//TODO: Fix login issue with error not displaying when login is incorrect.

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema = Yup.object({
    email: Yup
      .string()
      .email("Email is invalid. Please use a valid email.")
      .required("Email is Required"),
    password: Yup
      .string()
      .required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const response = dispatch(login(values));
      response.then((result) => {
        // Check if the login was fulfilled
        if (result && result.type === "auth/admin-login/fulfilled") {
          // Login was successful, navigate to 'admin' page
          navigate('admin');
        } else {
          // Handle login failure, show an error message or perform other actions here
          console.error("Login failed:", result.payload); // Log the response payload for debugging
        }
      }).catch((error) => {
        // Handle errors if the promise is rejected
        console.error("Error occurred during login:", error);
      });
    },
  });

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh"}}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <div className="error text-center">
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput 
            type="text" 
            name='email' 
            label="Email Address" 
            id="email"
            val={formik.values.email} 
            onChng={formik.handleChange("email")}
          />

          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ): null }
          </div>

          <CustomInput 
            type="password" 
            name='password' 
            label="Password" 
            id="pass"
            val={formik.values.password} 
            onChng={formik.handleChange("password")}
          />

          <div className="error">
            {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
            ): null }
          </div>

          <div className="mb-3 text-end">
            <Link to="forgot-password">Forgot Password?</Link>
          </div>
          <button
            className="d-block border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5" 
            style={{ background: "#ffd333"}}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login