import { React, useEffect } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createColor, getColor, resetState, updateColor } from '../features/color/colorSlice';

let schema = Yup.object({
  title: Yup.string().required("Color is Required"),
});

const Addcolor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorId = location.pathname.split('/')[3];
  const newColor = useSelector((state) => state.color);

  const { isSuccess, isError, isLoading, createdColors, colorName, updatedColor  } = newColor;

  useEffect(() => {
    if(getColorId !== undefined) {
      dispatch(getColor(getColorId));
    }
    else {
      dispatch(resetState());
    }
  }, [getColorId, dispatch]);


  useEffect(() => {
    if( isSuccess && createdColors) {
      toast.success('Color Added Successfully!');
    }
    if( isSuccess && updatedColor) {
      toast.success('Color Updated Successfully!');
      navigate('/admin/list-color');
    }
    if(isError) {
      toast.error('Something went wrong. Color Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading, createdColors, updatedColor, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getColorId !== undefined) {
        const data = {id: getColorId, colorData: values};
        dispatch(updateColor(data))
        dispatch(resetState());
      } 
      else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
        <h3 className='mb-4 title'>{ getColorId !== undefined ? "Edit" : "Add"} Color</h3>
        <div>
            <form action='' onSubmit={formik.handleSubmit}>
               <CustomInput 
                  type="text" 
                  label="Enter Color" 
                  onChng = {formik.handleChange("title")} 
                  onBlr = {formik.handleBlur("title")}
                  val = {formik.values.title}
                  id = "color" 
              />

             <div className='error'>
               {formik.touched.title && formik.errors.title}
             </div>

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{ getColorId !== undefined ? "Edit" : "Add"} Color</button>
            </form>
        </div>
    </div>
  )
}

export default Addcolor;