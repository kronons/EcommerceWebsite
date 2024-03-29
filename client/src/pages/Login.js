import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { CustomInput } from '../components/CustomInput'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/user/userSlice'


const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().required("Password is Required")
  })
  

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
              // Dispatch the loginUser action, which should return a promise
              const response = await dispatch(loginUser(values));
      
              // Check if the login was successful based on the presence of user data in the response
              if (response.payload && response.payload._id) {
                // If login was successful, navigate to the desired page
                navigate("/");
              } else {
                // Handle login failure, show an error message or perform other actions here
                //console.error("Login failed:", response.payload); // Log the response payload for debugging
              }
            } catch (error) {
              // Handle login failure, show an error message or perform other actions here
              //console.error("Login failed:", error);
            }
          },
        });

  return (
    <>
        <Meta title={'Login'}/>
        <Breadcrumb title='Login' />

        <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Login</h3>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>

                                <CustomInput 
                                    type = 'email' 
                                    name = 'email' 
                                    placeholder = 'Email' 
                                    onChange = { formik.handleChange("email") }
                                    onBlur = { formik.handleBlur("email") }
                                    value = { formik.values.email}
                                />

                                
                                <div className='error'>
                                    {
                                        formik.touched.email && formik.errors.email
                                    }
                                </div>

                                <CustomInput 
                                    type='password' 
                                    name='password' 
                                    placeholder='Password'  
                                    onChange = { formik.handleChange("password") }
                                    onBlur = { formik.handleBlur("password") }
                                    value = { formik.values.password}
                                />

                                <div className='error'>
                                    {
                                        formik.touched.password && formik.errors.password
                                    }
                                </div>

                                <div>
                                    <Link to='/forgot-password'>Forgot Password?</Link>
                                    <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'>Login</button>
                                        <Link to='/register' className='button signup'>Register</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </Container>
    </>
  )
}

export default Login