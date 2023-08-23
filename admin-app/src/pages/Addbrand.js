import { React, useEffect } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createBrands, getBrand, resetState, updateBrand } from '../features/brand/brandSlice';
import { useLocation, useNavigate } from 'react-router-dom';


let schema = Yup.object({
  title: Yup.string().required("Brand name is Required"),
});


const Addbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBrandId = location.pathname.split('/')[3];
  const newBrand = useSelector((state) => state.brand);

  const { isSuccess, isError, isLoading, createdBrand, brandName, updatedBrand } = newBrand;

  useEffect(() => {
    if(getBrandId !== undefined) {
      dispatch(getBrand(getBrandId));
    }
    else {
      dispatch(resetState());
    }
  }, [getBrandId, dispatch]);

  useEffect(() => {
    if( isSuccess && createdBrand ) {
      toast.success('Brand Added Successfully!');
    }
    if( isSuccess && updatedBrand) {
      toast.success('Brand Updated Successfully!');
      navigate('/admin/list-brand');
    }
    if(isError) {
      toast.error('Something went wrong. Brand Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading, createdBrand, navigate, updatedBrand ]);

  const formik = useFormik({
    enableReinitialize : true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBrandId !== undefined) {
        const data = {id: getBrandId, brandData: values};
        dispatch(updateBrand(data))
        dispatch(resetState());
      } 
      else {
        dispatch(createBrands(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });


  return (
    <div>
        <h3 className='mb-4 title'>{ getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
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

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{ getBrandId !== undefined ? "Edit" : "Add"} Brand</button>
            </form>
        </div>
    </div>
  )
}

export default Addbrand;