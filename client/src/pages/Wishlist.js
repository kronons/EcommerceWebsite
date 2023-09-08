import React, { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getWishList } from '../features/user/userSlice';
import { addToWishList } from '../features/products/productSlice';

const Wishlist = () => {
    const dispatch = useDispatch();

    const wishListState = useSelector((state) => state.auth.wishlist.wishlist);

    useEffect(() => {
            dispatch(getWishList());
    }, []);



    const removeFromWishList = (id) => {
        dispatch(addToWishList(id));
        setTimeout(() => {
            dispatch(getWishList());
        }, 300)
    }

    return (
        <>
            <Meta title={'Wishlist'} />
            <Breadcrumb title='Wishlist' />
            <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    {wishListState.length > 0 ? ( 
                        wishListState.map((item, index) => (
                            <div className='col-3' key={index}>
                                <div className='wishlist-card'>
                                    <div className='wishlist-card-image position-relative'>
                                        <img
                                            onClick={() => {removeFromWishList(item?._id)}}
                                            src='images/cross.svg'
                                            alt='cross'
                                            className='position-absolute cross img-fluid'
                                        />
                                        <img
                                            src={
                                                item.images[0].url
                                                    ? item.images[0].url
                                                    : 'images/cross.svg'
                                            }
                                            className='img-fluid w-100 d-block mx-auto'
                                            alt='watch'
                                        />
                                    </div>
                                    <div className='py-3 px-3'>
                                        <h5 className='title'>{item.title}</h5>
                                        <h6 className='price'>{item.price}</h6>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No items in your wishlist.</p>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Wishlist;