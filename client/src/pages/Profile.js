import React, { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '../components/Container'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateAUser } from '../features/user/userSlice'
import { FiEdit } from 'react-icons/fi'



const profileSchema = Yup.object({
    firstname: Yup.string().required("Firstname is Required"),
    lastname: Yup.string().required("Lastname is Required"),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    mobile: Yup.number().required("Mobile Number is Required"),
  })
  

const Profile = () => {

    const dispatch = useDispatch();

    const userState = useSelector(state => state.auth.user);

    const [ edit, setEdit ] = useState(true);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstname: userState?.firstname,
          lastname: userState?.lastname,
          email: userState?.email,
          mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: async (values) => {
            dispatch(updateAUser(values));
            setEdit(true);
        }
    });

  return (
    <>
        <Breadcrumb title="My Profile"/>
            <Container class1='cart-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 className='py-3'>Update Profile</h3>
                            <FiEdit className='fs-3' onClick={() => setEdit(false)}/>
                        </div>
                    </div>
                    <div className='col-12'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">Firstname</label>
                            <input 
                                type="text" 
                                name="firstname" 
                                className="form-control" 
                                id="firstname" 
                                value={formik.values.firstname}
                                onChange={formik.handleChange('firstname')}
                                onBlur={formik.handleBlur('firstname')}
                                disabled={edit}
                            />
                            <div className='error'>
                                {formik.touched.firstname && formik.errors.firstname}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Lastname</label>
                            <input 
                                type="text" 
                                name="lastname" 
                                className="form-control" 
                                id="lastname" 
                                value={formik.values.lastname}
                                onChange={formik.handleChange('lastname')}
                                onBlur={formik.handleBlur('lastname')}
                                disabled={edit}
                            />
                            <div className='error'>
                                {formik.touched.lastname && formik.errors.lastname}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="form-control" 
                                id="email" 
                                aria-describedby="emailHelp" 
                                value={formik.values.email}
                                onChange={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                disabled={edit}
                            />
                            <div className='error'>
                                {formik.touched.email && formik.errors.email}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">Mobile Number</label>
                            <input 
                                type="number" 
                                name="mobile" 
                                className="form-control" 
                                id="mobile" 
                                value={formik.values.mobile}
                                onChange={formik.handleChange('mobile')}
                                onBlur={formik.handleBlur('mobile')}
                                disabled={edit}
                            />
                            <div className='error'>
                                {formik.touched.mobile && formik.errors.mobile}
                            </div>
                        </div>
                        {
                            edit === false && <button type="submit" className="btn btn-primary" >Save</button>
                        }
                        </form>
                    </div>
                </div>
            </Container>
    </>
  )
}

export default Profile