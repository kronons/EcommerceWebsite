import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom'
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
        quantity 
    } = props;

    const dispatch = useDispatch();

    let location = useLocation();
    const userState = useSelector((state) => state.auth.user);
  
    const addProductsToWishList = (id) => {
      dispatch(addToWishList(id));
  };

    return (
        <div className='col-3 mb-3'>
        
        <Link 
        to={`${
            location.pathname === "/" 
            ? `/product/${id}` 
            : location.pathname ===  `/product/${id}` 
            ?  `/product/${id}` 
            : id
        }`}
        className='product-card position-relative'>

            
            <div className='special-product-card'>
                <div>
                    <img src='images/watch.jpg' className='img-fluid' alt='watch' />
                </div>
                <div className='special-product-content'>
                    <h5 className='brand'>{brand}</h5>
                    <h6 className='title'>{title}</h6>
                    <div className='d-flex align-items-center'>
                        <ReactStars
                            count={5}
                            size={24}
                            value={rating[0].star}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className='totalratings mt-3 ms-2'>({totalrating})</p>
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
                    {userState && (
                        <div className='wishlist-icon position-absolute'>
                            <button 
                                className='border-0 bg-transparent'
                                onClick={(e) => addProductsToWishList(id)}
                            >
                                <img src='/images/wish.svg' alt='' />
                            </button>
                        </div>
                    )}
                    <div className='action-bar position-absolute'>
                        <div className='d-flex flex-column gap-15'>
                            <button className='border-0 bg-transparent'>
                                <img src='/images/prodcompare.svg' alt='compare' />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src='/images/view.svg' alt='view' />
                            </button>
                            <button>
                                <img src='/images/add-cart.svg' alt='addcart' />
                            </button>
                        </div>
                    </div>
                    <Link className='button'>Add to cart</Link>
                </div>
            </div>
        </Link>
        </div>
    );
}

export default SpecialProduct;