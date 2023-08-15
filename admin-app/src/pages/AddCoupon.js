import { React, useEffect } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCoupons, resetState } from '../features/coupon/couponSlice';


let schema = Yup.object({
  name: Yup.string().required("Coupon code is Required"),
  expired : Yup.date().required("Expiration Date is Required"),
  discount : Yup.number().required("Discount Amount is Required"),
});


const AddCoupon = () => {
  const dispatch = useDispatch();

  const newCoupon = useSelector((state) => state.coupon.coupons);

  const { isSuccess, isError, isLoading, createdCoupons } = newCoupon;
  useEffect(() => {
    if( isSuccess && createdCoupons ) {
      toast.success('Coupon Added Successfully!');
    }
    if(isError) {
      toast.error('Something went wrong. Coupon Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading, createdCoupons]);

  const formik = useFormik({
    initialValues: {
      name: "",
      expired: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupons(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });


  return (
    <div>
        <h3 className='mb-4 title'>Add Coupon Code</h3>
        <div>
            <form action='' onSubmit={formik.handleSubmit}>
               <CustomInput 
                  type="text"
                  label="Enter a Coupon Code" 
                  name = "name" 
                  onChng = {formik.handleChange("name")} 
                  onBlr = {formik.handleBlur("name")}
                  val = {formik.values.name}
                  id = "name"
               />

                <div className='error'>
                    {formik.touched.name && formik.errors.name}
                </div>

                <CustomInput 
                  type="date"
                  label="Enter a Expiration Date" 
                  name = "expired" 
                  onChng = {formik.handleChange("expired")} 
                  onBlr = {formik.handleBlur("expired")}
                  val = {formik.values.expired}
                  id = "expired"
               />       

              <div className='error'>
                {formik.touched.expired && formik.errors.expired}
              </div>

              <CustomInput 
                  type="number"
                  label="Enter a discount amount" 
                  name = "discount" 
                  onChng = {formik.handleChange("discount")} 
                  onBlr = {formik.handleBlur("discount")}
                  val = {formik.values.discount}
                  id = "discount"
               />       

              <div className='error'>
                {formik.touched.discount && formik.errors.discount}
              </div>

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Coupon Code</button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon;