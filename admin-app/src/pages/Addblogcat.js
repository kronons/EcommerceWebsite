import { React, useEffect, useState } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBlogCategories, resetState } from "../features/bcategory/bcategorySlice";

let schema = Yup.object({
  title: Yup.string().required("Blog Category Name is Required"),
});

const Addblogcat = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBlogCategory = useSelector((state) => state.bCategory);

  const { isSuccess, isError, isLoading, createdBCategories} = newBlogCategory;
  useEffect(() => {
    if( isSuccess && createdBCategories ) {
      toast.success('Blog Category Added Successfully!');
    }
    if(isError) {
      toast.error('Something went wrong. Blog Category Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogCategories(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });



  return (
    <div>
        <h3 className='mb-4 title'>Add Blog Category</h3>
        <div>
            <form action='' onSubmit={formik.handleSubmit}>
               <CustomInput 
               type="text" 
               label="Enter Blog Category" 
               onChng = {formik.handleChange("title")} 
               onBlr = {formik.handleBlur("title")}
               val = {formik.values.title}
               id = "bCategory"
            />

            <div className='error'>
                {formik.touched.title && formik.errors.title}
            </div>

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default Addblogcat;