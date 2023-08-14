import { React, useEffect, useState } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBrands, resetState } from '../features/brand/brandSlice';


let schema = Yup.object({
  title: Yup.string().required("Brand name is Required"),
});


const Addbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBrand = useSelector((state) => state.brand);

  const { isSuccess, isError, isLoading, createdBrand } = newBrand;
  useEffect(() => {
    if( isSuccess && createdBrand ) {
      toast.success('Brand Added Successfully!');
    }
    if(isError) {
      toast.error('Something went wrong. Brand Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrands(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });


  return (
    <div>
        <h3 className='mb-4 title'>Add Brand</h3>
        <div>
            <form action='' onSubmit={formik.handleSubmit}>
               <CustomInput 
                  type="text"
                  label="Enter a Brand" 
                  name = "title" 
                  onChng = {formik.handleChange("title")} 
                  onBlr = {formik.handleBlur("title")}
                  val = {formik.values.title}
                  id = "brand"
               />

              <div className='error'>
                {formik.touched.title && formik.errors.title}
              </div>

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Brand</button>
            </form>
        </div>
    </div>
  )
}

export default Addbrand;