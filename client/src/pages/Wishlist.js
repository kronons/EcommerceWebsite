import React, { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, getWishList } from '../features/user/userSlice';
import { getAllProducts } from '../features/products/productSlice';

const Wishlist = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const wishListState = useSelector((state) => state.auth || []);

    useEffect(() => {
        // Dispatch actions to get wishlist and products
        dispatch(getWishList());
        dispatch(getAllProducts());
    }, [dispatch, user]);

    const removeItemFromWishList = (wishId) => {
        return async (dispatch) => {
            try {
                // Perform any asynchronous logic here if needed
                // For example, you can make an API request to remove the item
    
                // Dispatch the addToWishList action immediately
                dispatch(addToWishList(wishId));
    
                // Introduce a delay (e.g., 1000 milliseconds or 1 second)
                const delayMilliseconds = 50;
                await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
    
                // Dispatch the getWishList action after the delay
                dispatch(getWishList());
            } catch (error) {
                // Handle errors if necessary
                console.error('Error removing item from wishlist:', error);
            }
        };
    };

    return (
        <>
            <Meta title={'Wishlist'} />
            <Breadcrumb title='Wishlist' />
            <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
                {user ? (
                    <div className='row'>
                        {wishListState.wishlist.wishlist.length > 0 ? (
                            wishListState.wishlist.wishlist.map((wishListItem, index) => {
                                
                                return (
                                    <div className='col-3' key={index}>
                                        <div className='wishlist-card'>
                                            <div className='wishlist-card-image position-relative'>
                                                <img
                                                    onClick={() => dispatch(removeItemFromWishList(wishListItem._id))}
                                                    src='images/cross.svg'
                                                    alt='cross'
                                                    className='position-absolute cross img-fluid'
                                                />
                                                {wishListItem.images && wishListItem.images[0] && wishListItem.images[0].url ? (
                                                    <img
                                                        src={wishListItem.images[0].url}
                                                        className='img-fluid w-100 d-block mx-auto'
                                                        alt='watch'
                                                    />
                                                ) : (
                                                    <img
                                                        src='images/cross.svg'
                                                        className='img-fluid w-100 d-block mx-auto'
                                                        alt='watch'
                                                    />
                                                )}
                                            </div>
                                            <div className='py-3 px-3'>
                                                <h5 className='title'>{wishListItem.title}</h5>
                                                <h6 className='price'>{wishListItem.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No items in your wishlist.</p>
                        )}
                    </div>
                ) : (
                    <p>Log in to view your wishlist.</p>
                )}
            </Container>
        </>
    );
};

export default Wishlist;