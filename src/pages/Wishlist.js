import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'

const Wishlist = () => {
  return (
    <>
        <Meta title={'Wishlist'}/>
        <Breadcrumb title='Wishlist' />
        <Container class1='wishlist-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='wishlist-card'>
                            <div className='wishlist-card-image position-relative'>
                            <img 
                                src='images/cross.svg' 
                                alt='cross' 
                                className='position-absolute cross img-fluid' 
                            />
                            <img src='images/watch.jpg' className='img-fluid w-100' alt='watch' />
                            </div>
                            <div className='py-3 px-3'>
                                <h5 className='title'>
                                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-fi+3g Tablet
                                </h5>
                                <h6 className='price'>$100</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='wishlist-card'>
                            <div className='wishlist-card-image position-relative'>
                            <img 
                                src='images/cross.svg' 
                                alt='cross' 
                                className='position-absolute cross img-fluid' 
                            />
                            <img src='images/watch.jpg' className='img-fluid w-100' alt='watch' />
                            </div>
                            <div className='py-3 px-3'>
                                <h5 className='title'>
                                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-fi+3g Tablet
                                </h5>
                                <h6 className='price'>$100</h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='wishlist-card'>
                            <div className='wishlist-card-image position-relative'>
                            <img 
                                src='images/cross.svg' 
                                alt='cross' 
                                className='position-absolute cross img-fluid' 
                            />
                            <img src='images/watch.jpg' className='img-fluid w-100' alt='watch' />
                            </div>
                            <div className='py-3 px-3'>
                                <h5 className='title'>
                                    Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-fi+3g Tablet
                                </h5>
                                <h6 className='price'>$100</h6>
                            </div>
                        </div>
                    </div>
                </div>
        </Container>
    </>
  )
}

export default Wishlist