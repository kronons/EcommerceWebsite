import { React, useEffect } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBlogCategories, getBlogCategory, resetState, updateBlogCategory } from "../features/bcategory/bcategorySlice";
import { useLocation, useNavigate } from 'react-router-dom';


let schema = Yup.object({
  title: Yup.string().required("Blog Category Name is Required"),
});

const Addblogcat = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBlogCategoryId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);

  const { isSuccess, isError, isLoading, createdBCategories, bCategoryName, updatedBCategory } = newBlogCategory;

  useEffect(() => {
    if(getBlogCategoryId !== undefined) {
      dispatch(getBlogCategory(getBlogCategoryId));
    }
    else {
      dispatch(resetState());
    }
  }, [getBlogCategoryId, dispatch]);

  useEffect(() => {
    if( isSuccess && createdBCategories ) {
      toast.success('Blog Category Added Successfully!');
    }
    if( isSuccess && updatedBCategory) {
      toast.success('Blog Category Updated Successfully!');
      navigate('/admin/list-blog-category');
    }
    if(isError) {
      toast.error('Something went wrong. Blog Category Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading, createdBCategories, navigate, updatedBCategory]);

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      title: bCategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBlogCategoryId !== undefined) {
        const data = {id: getBlogCategoryId, bCatData: values};
        dispatch(updateBlogCategory(data))
        dispatch(resetState());
      } 
      else {
        dispatch(createBlogCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });



  return (
    <div>
        <h3 className='mb-4 title'>{ getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category</h3>
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

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{ getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default Addblogcat;