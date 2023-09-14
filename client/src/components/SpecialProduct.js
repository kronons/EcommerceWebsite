import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishList } from '../features/products/productSlice';

const SpecialProduct = (props) => {
    const { 
        id,
        title, 
        brand, 
        rating, 
        totalrating, 
        price, 
        sold, 
        quantity,
        images, 
    } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector((state) => state.auth.user);
  
    const addProductsToWishList = (id) => {
      dispatch(addToWishList(id));
  };

    return (
        <div className='col-3 mb-3'>
            <div className='product-card position-relative'>
                    <div>
                        <img src={images[0].url} className='img-fluid' alt='watch' onClick={() => navigate("/product/" + id)} />
                    </div>
                    <div className='special-product-content'>
                        <h5 className='brand' onClick={() => navigate("/product/" + id)} >{brand}</h5>
                        <h6 className='title' onClick={() => navigate("/product/" + id)} >{title}</h6>
                        <div className='d-flex align-items-center'>
                            <ReactStars
                                count={5}
                                size={24}
                                value={parseInt(totalrating)}
                                edit={false}
                                activeColor="#ffd700"
                            />
                            <p className='numberofratings mt-3 ms-2'>({rating.length})</p>
                        </div>
                
                        <p className='price'>
                            <span className='red-p'>${price}</span> &nbsp; <strike>$200</strike>
                        </p>
                        <div className='discount-till d-flex align-items-center gap-10'>
                            <p className='mb-0'>
                                <b>5 </b>Days
                            </p>
                            <div className='d-flex gap-10 align-items-center'>
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>
                            </div>
                        </div>
                        <div className='prod-count my-3'>
                            <p>Products Sold: {sold}</p>
                            <div className="progress">
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ width: (sold / quantity) * 100 + "%" }} 
                                    aria-valuenow={(sold / quantity) * 100} 
                                    aria-valuemin={0}
                                    aria-valuemax={quantity}>
                                    <div className='ms-auto'>
                                        {sold/quantity * 100+ "%"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='action-bar position-absolute'>
                        <div className='d-flex flex-column gap-15'>
                            {userState && (
                            <button 
                                className='border-0 bg-transparent'
                                onClick={(e) => addProductsToWishList(id)}
                            >
                                <img src='/images/wish.svg' alt='' />
                            </button>
                            )}
                            <button className='border-0 bg-transparent'>
                                <img src='/images/prodcompare.svg' alt='compare' />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src='/images/add-cart.svg' alt='addcart' />
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpecialProduct;