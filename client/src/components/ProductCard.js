import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { addToWishList } from '../features/products/productSlice';


function ProductCard(props) {

    const dispatch = useDispatch();

    const { grid, data } = props;
    let location = useLocation();

    const addProductsToWishList = (id) => {
        dispatch(addToWishList(id));
    };



    return (
        <>
            {
                data?.map((item, index) => {
                    return(
                        <div
                            key={index} 
                            className={` ${location.pathname == '/product' ? `gr-${grid}` : 'col-3'} `}>
                            <Link 
                            to={`${
                                location.pathname == "/" 
                                ? `/product/${item?._id}` 
                                : location.pathname ==  `/product/${item?._id}` 
                                ?  `/product/${item?._id}` 
                                : item?._id
                            }`}
                            className='product-card position-relative'>

                            <div className='wishlist-icon position-absolute'>
                                <button 
                                    className='border-0 bg-transparent'
                                    onClick={(e) => addProductsToWishList(item?._id)}
                                >
                                    <img src='/images/wish.svg' alt='' />
                                </button>
                            </div>
                            <div className='product-image'>

                                <img 
                                    src={item?.images[0].url}
                                    className='img-fluid' 
                                    alt='product image' 
                                />

                                <img 
                                    src={item?.images[0].url}
                                    className='img-fluid'  
                                    alt='product image' 
                                />

                            </div>
                            <div className='product-details'>
                                <h6 className='brand mt-4'>{item.brand}</h6>
                                <h5 className='product-title'>
                                    {item?.title}
                                </h5>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={parseInt(item?.totalrating)}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                                <p className={`description ${grid == 12 ? 'd-block' : 'd-none'}`}
                                        dangerouslySetInnerHTML={{__html: item?.description}}
                                >
                                    
                                </p>
                                <p className='price'>
                                    ${item?.price}
                                </p>
                            </div>
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
                            </Link>
                        </div>
                    )
                })
            }

    </>
    )
}

export default ProductCard