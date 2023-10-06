import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { CustomInput } from '../components/CustomInput'
import { useDispatch } from 'react-redux'
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotAPasswordToken } from '../features/user/userSlice'



const forgotPasswordSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is Required'),
  })


const Forgotpassword = () => {

    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: {
          email: "",
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values) => {
            dispatch(forgotAPasswordToken(values));
          },
        });

  return (
    <>
        <Meta title={'Forgot Password'}/>
        <Breadcrumb title='Forgot Password' />

        <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Reset Your Password</h3>
                            <p className='text-center mt-2 mb-3'>
                            We will send you an email to reset your password.
                            </p>
                            <form 
                                action='' 
                                className='d-flex flex-column gap-15'
                                onSubmit={formik.handleSubmit}
                            >
                                <CustomInput 
                                    type='email' 
                                    name='email' 
                                    placeholder='Email' 
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                />
                                <div className='error'>
                                    {
                                        formik.touched.email && formik.errors.email
                                    }
                                </div>

                                <div>
                                    <div className=' mt-3 d-flex justify-content-center flex-column gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'> Submit </button>
                                        <Link to='/Login'>Cancel</Link>
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

export default Forgotpassword