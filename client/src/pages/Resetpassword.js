import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import { CustomInput } from '../components/CustomInput'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux'
import { resetAPassword } from '../features/user/userSlice'


const resetPasswordSchema = Yup.object({
    password: Yup.string().required('Password is Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is Required'),
  })

const Resetpassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const getToken = location.pathname.split('/')[2];
    
    const formik = useFormik({
        initialValues: {
          password: '',
          confirmPassword: '',
        },
        validationSchema: resetPasswordSchema,
        onSubmit: async (values) => {
            dispatch(resetAPassword({token:getToken, password:values.password}));
            navigate('/login');
        },
      });

  return (
    <>
        <Meta title={'Reset Password'}/>
        <Breadcrumb title='Reset Password' />
        <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card'>
                            <h3 className='text-center mb-3'>Reset Password</h3>
                            <form onSubmit={formik.handleSubmit} action='' className='d-flex flex-column gap-15'>
                            <CustomInput 
                                type='password' 
                                name='password' 
                                placeholder='Password' 
                                value={formik.values.password}
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                            />
                            <div className='error'>
                                {
                                    formik.touched.password && formik.errors.password
                                }
                            </div>
                            <CustomInput 
                                type='password' 
                                name='confirmPassword' 
                                placeholder='Confirm Password' 
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange('confirmPassword')}
                                onBlur={formik.handleBlur('confirmPassword')}
                            />
                            <div className='error'>
                                {
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                }
                            </div>
                                
                                <div>
                                    <div className=' mt-3 d-flex justify-content-center gap-15 align-items-center'>
                                        <button className='button border-0' type='submit'> Submit </button>
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

export default Resetpassword