import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import Container from '../components/Container'
import GooglePayButton from "@google-pay/button-react"
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import { createAOrder, emptyCart } from '../features/user/userSlice'



const shippingSchema = Yup.object({
  country: Yup.string().required("A Country is Required"),
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  address: Yup.string().required("Address Details is Required"),
  city: Yup.string().required('City is Required'),
  state: Yup.string().required("State is required"),
  zipCode: Yup.number().required("Zip Code is required")
})


const Checkout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartState = useSelector(state => state.auth.cart);

  const [ isFormSubmitted, setIsFormSubmitted ] = useState(false);
  const [ shippingInfo, setShippingInfo ] = useState(null);
  const [ paymentInfo, setPaymentInfo ] = useState(null);
  const [ items, setItems ] = useState(null);
  const [ cartId, setCartId ] = useState(null);

  let subTotal = 0;
  let shipping = 1;
  let total = 0;
  let timer = 0; 
 

  useEffect(() => {
    const updatedItems = cartState.map((item) => ({
      product: item.productId._id,
      color: item.color._id,
      quantity: item.quantity,
      price: item.price,
    }));
    
    setItems(updatedItems);
  }, [cartState]);

  const sendOrder = async () => {
    if (isFormSubmitted && paymentInfo && shippingInfo) {

      try {
        await dispatch(createAOrder({ shippingInfo, orderItems: items, totalPrice: subTotal, totalPriceAfterDiscount: total, paymentInfo }));
      } 
      catch (error) {
        // Handle dispatch error
      }
    }
  };

  useEffect(() => {
    if (paymentInfo) {
      clearTimeout(timer);
      sendOrder();
    }
  }, [paymentInfo, sendOrder]);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const emptyCartAndNavigate = async() => {
    const timer = setTimeout(() => {
      navigate("/");
      dispatch(emptyCart(cartId));
      return new Promise((resolve, reject) => {
        clearTimeout(timer);
        resolve();
      });
    }, 1000); // 1000 milliseconds delay (1 second)
  }

  const formik = useFormik({
    initialValues: {
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      other:"",
    },
    validationSchema: shippingSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setShippingInfo({ ...values, other: values.other || "" });
      if (cartState && cartState.length > 0) {
        setCartId(cartState[0]._id); 
      }
      setTimeout(() => {
        setIsFormSubmitted(true); 
        setSubmitting(false); 
      }, 1000); 
    },
  });

  return (
    <>
      <Container className='checkout-wrapper py-5 home-wrapper-2'>
          <div className='row'>
            <div className='col-7'>
              <div className='checkout-left-data mt-4 my-4'>
                <h3 className='webisite-name'>Dev Corner</h3>
                <nav 
                  style={{"--bs-breadcrumb-divider": '>' }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link className='text-dark total-price' to='/cart'>Cart</Link>
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active total-price" aria-current="page">
                      Information
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active total-price">
                      Shipping
                    </li>
                    &nbsp; /
                    <li className="breadcrumb-item active total-price" aria-current="page">
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className='title total'>Contact Information</h4>
                <p className='user-details total'>John Doe (John.Doe@test.com)</p>
                <h4 className='mb-3'>Shipping Address</h4>
                <form  
                  action='' 
                  className='d-flex gap-15 flex-wrap justify-content-between'
                  onSubmit={formik.handleSubmit}
                >
                    <div className='w-100'>
                      <select 
                        name='country' 
                        className='form-control form-select' 
                        id='countrySelect'
                        onChange={formik.handleChange("country")}
                        onBlur={formik.handleBlur("country")}
                        value={formik.values.country}
                      >
                        <option value='' disabled>
                          Select Country
                        </option>
                        <option value='USA'>
                          United States
                        </option>
                      </select>
                      <div className='ms-2 my-1 alert-danger'>
                        {
                          formik.touched.country && formik.errors.country
                        }
                      </div>
                    </div>
                    <div className='flex-grow-1'>
                      <input 
                        type='text' 
                        placeholder='First Name' 
                        className='form-control'
                        onChange={formik.handleChange("firstName")}
                        onBlur={formik.handleBlur("firstName")}
                        value={formik.values.firstName} 
                      />
                      <div className='ms-2 my-1 alert-danger'>
                        {
                          formik.touched.firstName && formik.errors.firstName
                        }
                      </div>
                    </div>
                    <div className='flex-grow-1'>
                      <input 
                        type='text' 
                        placeholder='Last Name' 
                        className='form-control'
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                        value={formik.values.lastName}  
                      />
                      <div className='ms-2 my-1 alert-danger'>
                        {
                          formik.touched.lastName && formik.errors.lastName
                        }
                      </div>
                    </div>
                    <div className='w-100'>
                      <input 
                        type='text' 
                        placeholder='Address' 
                        className='form-control' 
                        onChange={formik.handleChange("address")}
                        onBlur={formik.handleBlur("address")}
                        value={formik.values.address}  
                      />
                      <div className='ms-2 my-1 alert-danger'>
                        {
                          formik.touched.address && formik.errors.address
                        }
                      </div>
                    </div>
                    <div className='w-100'>
                      <input 
                        type='text' 
                        placeholder='Apartment, Suite, etc' 
                        className='form-control' 
                        onChange={formik.handleChange("other")}
                        onBlur={formik.handleBlur("other")}
                        value={formik.values.other}
                      />
                    </div>
                    <div className='flex-grow-1'>
                      <input 
                        type='text' 
                        placeholder='City' 
                        className='form-control' 
                        onChange={formik.handleChange("city")}
                        onBlur={formik.handleBlur("city")}
                        value={formik.values.city}  
                      />
                      <div className='ms-2 my-1 alert-danger'>
                        {
                          formik.touched.city && formik.errors.city
                        }
                      </div>
                    </div>
                    <div className='flex-grow-1' >
                    <select 
                      name='state' 
                      className='form-control form-select' 
                      id='stateSelect'
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      value={formik.values.state}
                    >
                      <option value='' disabled>
                        Select State
                      </option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <div className='ms-2 my-1 alert-danger'>
                        {
                          formik.touched.state && formik.errors.state
                        }
                      </div>
                    </div>
                    <div className='flex-grow-1'>
                      <input 
                        type='text' 
                        placeholder='Zip Code' 
                        className='form-control'
                        onChange={formik.handleChange("zipCode")}
                        onBlur={formik.handleBlur("zipCode")}
                        value={formik.values.zipCode}  
                      />
                      <div className='ms-2 my-1 alert-danger'>
                        {
                          formik.touched.zipCode && formik.errors.zipCode
                        }
                      </div>
                    </div>
                    <div className='w-100'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <Link to='/cart' className='text-dark'>
                          <BiArrowBack className='me-2'/>
                          Return to Cart
                        </Link>
                        <button className='button' type="submit">Continue to Pay</button>
                      </div>
                    </div>
                </form>
              </div>
            </div>
            <div className='col-5'>
              <div className='border-bottom py-4 mt-4 my-4'>
                {
                  cartState && cartState?.map((item, index) => {
                    subTotal += item?.price * item?.quantity;
                    total = subTotal + shipping;
                    return (
                      <div key={index} className='d-flex gap-10 mb-2 align-items-center'>
                      <div className='w-75 d-flex gap-10'>
                        <div className='w-25 position-relative'>
                          <span 
                            style={{ top:'-10px', right: '2px' }} 
                            className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>
                            {item?.quantity}
                          </span>
                          <img className='img-fluid' src={item?.productId.images[0].url} alt='product' />
                        </div>
                        <div>
                          <h5 className='total-price'>{item?.productId?.title}</h5>
                          <p className='total-price'>{item?.color?.title}</p>
                        </div>
                        <div className='flex-grow-1'>
                          <h5 className='total'>$ {item?.price * item?.quantity}</h5>
                        </div>
                      </div>
                    </div>
                    )
                  })
                }

              </div>
              <div className='border-bottom py-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='total'>Shipping</p>
                  <p className='total-price'>$ {shipping}</p>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-0 total'>Subtotal</p>
                  <p className='mb-0 total-price'>$ {subTotal}</p>
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                <h4 className='total'>Total</h4>
                <h5 className='total-price'>$ {total}</h5>
              </div>
                <div className='d-flex justify-content-end mt-3'>
                  {isFormSubmitted && (
                    <GooglePayButton 
                              environment='TEST'
                              paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                  {
                                    type: 'CARD',
                                    parameters: {
                                      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                      allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                    },
                                    tokenizationSpecification: {
                                      type: 'PAYMENT_GATEWAY',
                                      parameters: {
                                        gateway: 'example',
                                        getwayMerchantId: '12345678901234567890',
                                      },
                                  },
                                  }
                                ],
                                merchantInfo: {
                                  merchantId: '1234567890',
                                  merchantName: 'Demo Merchant'
                                },
                                transactionInfo: {
                                  totalPriceStatus: 'FINAL',
                                  totalPriceLabel: 'Total',
                                  totalPrice: `${total}`,
                                  currencyCode: 'USD',
                                  countryCode: 'US',
                                },
                                shippingAddressRequired: true,
                                callbackIntents: ['PAYMENT_AUTHORIZATION'],
                              }}
                              onLoadPaymentData={paymentRequest => {
                                console.log('Sucess', paymentRequest);
                              }}
                              onPaymentAuthorized={paymentData => {
                                const transactionId = paymentData.paymentMethodData.tokenizationData.token;
                                setPaymentInfo({paymentId: transactionId, orderId: transactionId});
                                console.log('Payment Authorized Success', paymentData);
                                emptyCartAndNavigate();
                                return { transactionState: 'SUCCESS'}
                              }}
                              existingPaymentMethodRequired = 'false'
                              buttonColor='white'
                              buttonType='Buy'
                      />
                  )}
                </div>
            </div>
          </div>
        </Container>
    </>
  )
}

export default Checkout