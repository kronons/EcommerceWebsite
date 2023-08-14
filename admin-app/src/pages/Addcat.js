import { React, useEffect, useState } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createProductCategories, resetState } from '../features/pcategory/pcategorySlice';


let schema = Yup.object({
  title: Yup.string().required("Category Name is Required"),
});


const Addcat = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCategory = useSelector((state) => state.pCategory);

  const { isSuccess, isError, isLoading, createdCategories } = newCategory;
  useEffect(() => {
    if( isSuccess && createdCategories) {
      toast.success('Category Added Successfully!');
    }
    if(isError) {
      toast.error('Something went wrong. Category Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProductCategories(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });


  return (
    <div>
        <h3 className='mb-4 title'>Add Product Category</h3>
        <div>
            <form action='' onSubmit={formik.handleSubmit}>
               <CustomInput 
                type="text" 
                label="Enter a Product Category"
                onChng = {formik.handleChange("title")} 
                onBlr = {formik.handleBlur("title")}
                val = {formik.values.title}
                id = "category" 
               />

              <div className='error'>
                {formik.touched.title && formik.errors.title}
              </div>

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Category</button>
            </form>
        </div>
    </div>
  )
}

export default Addcat;