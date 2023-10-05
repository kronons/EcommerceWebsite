import React, { useEffect } from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../features/user/userSlice'



const Orders = () => {

    const dispatch = useDispatch();

    const orderState = useSelector(state => state.auth?.getorderedProduct?.orders)

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch])


  return (
    <>
        <Breadcrumb title='My Orders' ></Breadcrumb>
        <Container class1='cart-wrapper home-wrapper-2 py-5'>
            <div className='row'>
                <div children='col-12'>
                    <div className='row'>
                            <div className='col-3'>
                                <h5>Order Id</h5>
                            </div>
                            <div className='col-3'>
                                <h5>Total Amount</h5>
                            </div>
                            <div className='col-3'>
                                <h5>Total Amount After Discount</h5>
                            </div>
                            <div className='col-3'>
                                <h5>Status</h5>
                            </div>
                    </div>

                </div>
                <div className='col-12 mt-3'>
                    {
                        orderState && orderState.map(( item, index ) => {
                            return (
                                <div className='row my-3 pt-3' key={index} style={{backgroundColor:"#febd69"}}>
                                    <div className='col-3'>
                                        <p>{item?._id}</p>
                                    </div>
                                    <div className='col-3'>
                                        <p>{item?.totalPrice}</p>
                                    </div>
                                    <div className='col-3'>
                                        <p>{item?.totalPriceAfterDiscount}</p>
                                    </div>
                                    <div className='col-3'>
                                        <p>{item?.orderStatus}</p>
                                    </div>
                                    <div className='col-12 '>
                                        <div className='row py-3' style={{backgroundColor:"#232f3e"}}>
                                            <div className='col-3'>
                                                <h6 className='text-white'>Product Name</h6>
                                            </div>
                                            <div className='col-3'>
                                                <h6 className='text-white'>Quantity</h6>
                                            </div>
                                            <div className='col-3'>
                                                <h6 className='text-white'>Price</h6>
                                            </div>
                                            <div className='col-3'>
                                                <h6 className='text-white'>Color</h6>
                                            </div>
                                            {
                                                item?.orderItems?.map((item, index) => {
                                                    return (
                                                        <div className='col-12' key={index}>
                                                            <div className='row py-3'>
                                                                <div className='col-3'>
                                                                    <p className='text-white'>{item?.product?.title}</p>
                                                                </div>
                                                                <div className='col-3'>
                                                                    <p className='text-white'>{item?.quantity}</p>
                                                                </div>
                                                                <div className='col-3'>
                                                                    <p className='text-white'>{item?.product?.price}</p>
                                                                </div>
                                                                <div className='col-3'>
                                                                    <ul className='colors ps-0'>
                                                                        <li style={{backgroundColor:item?.color}}></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }       
                </div>
            </div>
        </Container>
    </>
  )
}

export default Orders