import { React, useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Meta from '../components/Meta';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, removeAProductFromCart, updateAProductQuantityFromCart } from '../features/user/userSlice';

const Cart = () => {
    const dispatch = useDispatch();

    const userCartState = useSelector(state => state.auth.cart);
    
    const [quantities, setQuantities] = useState([]);

    // Initialize quantities array with default values from userCartState
    useEffect(() => {
        if (Array.isArray(userCartState) && userCartState.length > 0) {
            const timer = setTimeout(() => {
                const initialQuantities = userCartState.map(item => item.quantity);
                setQuantities(initialQuantities);
            }, 100); // 1000 milliseconds delay (1 second)
    
            // Clear the timeout if the component unmounts or userCartState changes before the timeout is executed
            return () => clearTimeout(timer);
        }
    }, [userCartState]);


    let total = 0;
    let subTotal = 0;
    
    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    const updateQuantityCartProduct = (productUpdateDetail) => {
        dispatch(updateAProductQuantityFromCart(productUpdateDetail));
        setTimeout(() => {
            dispatch(getUserCart());
        }, 100);
    }

    const handleQuantityChange = (index, value) => {     
        
        // Update the quantity for the specified index
        const newQuantities = [...quantities];
        newQuantities[index] = value;
        setQuantities(newQuantities);

        // Set the productUpdateDetail state with the updated details
        const productUpdateDetail = {
            cartItemId: userCartState[index]._id,
            quantity: value
        };

        // Call the updateQuantityCartProduct function with the updated details as an object
        updateQuantityCartProduct(productUpdateDetail);
    }

    const removeACartProduct = (id) => {
        dispatch(removeAProductFromCart(id));
        setTimeout(() => {
            dispatch(getUserCart());
        }, 200)
    }

    return (
        <>
            <Meta title={'Cart'}/>
            <Breadcrumb title='Cart' />
            <Container class1='cart-wrapper home-wrapper-2 by-5'>

                <div className='row'>
                    <div className='col-12'>
                        <div className='cart-header py-3 d-flex justify-content-between align-items-center'>
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        {userCartState && userCartState.length > 0 ? (
                            userCartState.map((item, index) => {
                                total = item?.price * quantities[index];
                                subTotal += total;
                                return (
                                    <div key={index} className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'>
                                        <div className='cart-col-1 gap-15 d-flex align-items-center '>
                                            <div className='w-25'>
                                                <img 
                                                    src={item?.productId.images[0].url}
                                                    className='img-fluid' 
                                                    alt='product' 
                                                />
                                            </div>
                                            <div className='w-75'>
                                                {item.productId ? (
                                                    <>
                                                        <p>Product: {item?.productId.title}</p>
                                                        <div className='d-flex gap-3'>Color:
                                                            <ul className='colors ps-0'>
                                                                <li style={{backgroundColor:item?.color.title}}></li>
                                                            </ul>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p>Product information not available.</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className='cart-col-2'>
                                            <h5 className='price'>$ {item?.price}</h5>
                                        </div>
                                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                                            <div>
                                                <input 
                                                    className='form-control'
                                                    type='number' 
                                                    name=''
                                                    min={1}
                                                    max={10} 
                                                    id='' 
                                                    value={quantities[index] || ''}
                                                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <AiFillDelete 
                                                    className='text-danger'
                                                    onClick={() => removeACartProduct(item?._id)} 
                                                />
                                            </div>
                                        </div>
                                        <div className='cart-col-4'>
                                            <h5 className='price'>$ {total}</h5>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                    <div className='col-12 py-2 mt-4'>
                        <div className='d-flex justify-content-between align-items-baseline'>
                            <Link to='/product' className='button'>
                                Continue To Shop
                            </Link>
                            <div className='d-flex flex-column align-items-end'>
                            <h4>Subtotal: $ {subTotal}</h4>
                            <p>Taxes & shipping calculated at checkout</p>
                            <Link to='/checkout' className='button'>
                                Checkout
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Cart;