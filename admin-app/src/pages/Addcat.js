import { React, useEffect } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createProductCategories, getProductCategory, resetState, updateProductCategories } from '../features/pcategory/pcategorySlice';
import { useLocation, useNavigate } from 'react-router-dom';


let schema = Yup.object({
  title: Yup.string().required("Category Name is Required"),
});


const Addcat = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getPcatId = location.pathname.split('/')[3];
  const newCategory = useSelector((state) => state.pCategory);

  const { isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory } = newCategory;

  useEffect(() => {
    if(getPcatId !== undefined) {
      dispatch(getProductCategory(getPcatId));
    }
    else {
      dispatch(resetState());
    }
  }, [getPcatId, dispatch]);

  useEffect(() => {
    if( isSuccess && createdCategory) {
      toast.success('Product Category Added Successfully!');
    }
    if( isSuccess && updatedCategory) {
      toast.success('Product Category Updated Successfully!');
      navigate('/admin/list-category');
    }
    if(isError) {
      toast.error('Something went wrong. Category Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading, createdCategory, updatedCategory, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPcatId !== undefined ) {
        const data = {id: getPcatId, categoryData: values };
        dispatch(updateProductCategories(data));
        dispatch(resetState());
      }
      else {
        dispatch(createProductCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }

    },
  });


  return (
    <div>
        <h3 className='mb-4 title'>{ getPcatId !== undefined ? "Edit" : "Add"} Product Category</h3>
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

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{ getPcatId !== undefined ? "Edit" : "Add"} Product Category</button>
            </form>
        </div>
    </div>
  )
}

export default Addcat;