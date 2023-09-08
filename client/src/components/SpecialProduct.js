import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {
    const { 
        title, 
        brand, 
        rating, 
        totalrating, 
        price, 
        sold, 
        quantity 
    } = props;

    return (
        <div className='col-3 mb-3'>
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
                    <Link className='button'>Add to cart</Link>
                </div>
            </div>
        </div>
    );
}

export default SpecialProduct;