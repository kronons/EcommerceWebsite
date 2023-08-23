import { React, useEffect } from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createCoupons, getACoupon, resetState, updateACoupon } from '../features/coupon/couponSlice';
import { useLocation, useNavigate } from 'react-router-dom';


let schema = Yup.object({
  name: Yup.string().required("Coupon code is Required"),
  expired : Yup.date().required("Expiration Date is Required"),
  discount : Yup.number().required("Discount Amount is Required"),
});


const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getCouponId = location.pathname.split('/')[3];
  const newCoupon = useSelector((state) => state.coupon);
  let couponName = "";
  let couponExpired = "";
  let couponDiscount = 0;

  const { isSuccess, isError, isLoading, createdCoupon, updatedCoupon, coupons} = newCoupon;

  for( let i = 0; i < coupons.length; i++) {
    if(coupons[i]._id === getCouponId) {
      couponName = coupons[i].name;
      couponExpired = coupons[i].expired;
      couponDiscount = coupons[i].discount;
    }
  };

  // Format the date to the correct format to be displayed
  const changeDateFormat = (date) => {
    if (!date) return ""; // Return an empty string if date is not available
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if(getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    }
    else {
      dispatch(resetState());
    }
  }, [getCouponId, dispatch]);

  useEffect(() => {
    if( isSuccess && createdCoupon ) {
      toast.success('Coupon Added Successfully!');
    }
    if( isSuccess && updatedCoupon) {
      toast.success('Coupon Updated Successfully!');
      navigate('/admin/list-coupon');
    }
    if(isError) {
      toast.error('Something went wrong. Coupon Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading, createdCoupon, updatedCoupon, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expired: changeDateFormat(couponExpired) ||  "",
      discount: couponDiscount ||  "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getCouponId !== undefined) {

        const couponData = {
          id: getCouponId,
          name: formik.values.name,
          expired: formik.values.expired,
          discount: formik.values.discount,
        };
        
        // Dispatch the update action
        dispatch(updateACoupon(couponData));
        dispatch(resetState());
      } 
      else {
        dispatch(createCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });


  return (
    <div>
        <h3 className='mb-4 title'>{ getCouponId !== undefined ? "Edit" : "Add"} Coupon Code</h3>
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

               <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{ getCouponId !== undefined ? "Edit" : "Add"} Coupon Code</button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon;