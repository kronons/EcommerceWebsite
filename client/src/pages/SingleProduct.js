import React, { useState , useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import ReactStars from 'react-rating-stars-component';
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct, getAllProducts, rateAProduct, resetState } from '../features/products/productSlice';
import { toast } from "react-toastify";
import { getUserCart, addAndUpdateACart } from '../features/user/userSlice';


const SingleProduct = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [ color, setColor ] = useState(null);
    const [ quantity, setQuantity ] = useState(1);
    const [ star, setStar ] = useState(null);
    const [ comment, setComment ] = useState(null);

    const getProductId =location.pathname.split("/")[2];

    const productState = useSelector(state => state.product.product);
    const allProductState = useSelector(state => state.product.products);
    const userState = useSelector(state => state.auth);
    const cartState = useSelector(state => state.auth.cart);

    const [ props, setProps ]  = useState({
        img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
    });

    const [newQuantity, setNewQuantity] = useState(1);
    const [isUpdatingCart, setIsUpdatingCart] = useState(false); // Add a flag

    const uploadCart = () => {
        if (color === null) {
            toast.error("Please choose a color.");
            return false;
        }
    
        setIsUpdatingCart(true); // Set the flag before updating the quantity
    
        // Check if cartState is not null before mapping through it
        if (cartState !== undefined) {
            cartState.map((item, index) => {
                if (item.productId._id === productState?._id && item.color._id === color) {
                    let newQuantity = parseInt(item.quantity) + parseInt(quantity);
                    setNewQuantity(newQuantity); // Set the quantity state
                }
                return null;
            });
        }
    }

    // Use useEffect to dispatch after quantity has been updated
    useEffect(() => {
    if (isUpdatingCart) {
        dispatch(addAndUpdateACart({
            productId: productState?._id,
            color,
            quantity: newQuantity, // Use the updated quantity here
            price: productState?.price
         }));
            setIsUpdatingCart(false); // Reset the flag
            setTimeout(() => {
                navigate("/cart");
            }, 200)   
        }
    }, [isUpdatingCart, dispatch, productState, color, newQuantity, navigate]);

    useEffect(() => {
        dispatch(resetState());
        dispatch(getAProduct(getProductId));
        dispatch(getAllProducts());
        dispatch(getUserCart());

    }, [dispatch, getProductId])

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
          .then(() => {
            console.log('Text copied to clipboard:', text);
          })
          .catch((error) => {
            console.error('Error copying text to clipboard:', error);
          });
      };

    useEffect(() => {
    // Check if productState.images exists and has at least one image
    if (productState.images && productState.images.length > 0) {
        setProps({
            img: productState.images[0].url // Set the main image to the first image in the productState
        });
    }
}, [productState]);

  useEffect(() => {

    const handleResize = () => {
      // Update props based on screen size
      if (window.innerWidth < 768) {
        setProps({
          img: productState?.images[0]?.url
        });

      } else {
        setProps({
          img: productState?.images[0]?.url
        });
      }
    };

    // Attach event listener for screen size change
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [productState?.images]); // Empty dependency array to run the effect only once on component mount


  const addRatingToProduct = () => {
    if( star === null) {
        toast.error("Add Star Rating Again");
        return false
    }
    else if( comment === null) {
        toast.error("Please write a review about the product.");
        return false
    }
    else{
        dispatch(rateAProduct({star:star,prodId:getProductId,comment:comment}));
    }
  }
  
    return (
    <>
        <Meta title={'Product Name'}/>
        <Breadcrumb title={productState?.title} />
        <Container class1='main-product-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='main-product-image'>
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                            <div className='other-product-images d-flex flex-wrap gap-15'>
                                {productState && productState.images && productState.images.map((item, index) => (
                                <div key={index}>
                                    <img src={item.url} alt='' className='img-fluid' />
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='main-product-details'>
                            <div className='border-bottom'>
                                <h3 className='title'>
                                    {productState?.title}
                                </h3>
                            </div>
                            <div className='border-bottom py-3'>
                                <p className='price'>$ {productState?.price}</p>
                                <div className='d-flex align-items-center gap-10'>
                                    {productState?.totalrating && (
                                        <ReactStars
                                        count={5}
                                        size={24}
                                        value={parseInt(productState.totalrating)}
                                        edit={false} 
                                        activeColor="#ffd700"
                                        />
                                    )}
                                    {productState?.ratings && (
                                        <p className='mb-0 t-review'>({productState.ratings.length} reviews )</p>
                                    )}
                                </div>
                                <a className='review-btn' href='#review'>Write a Review</a>
                            </div>
                            <div className='py-3'>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Type :</h3> 
                                    <p className='product-data'>Watch</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Brand :</h3> 
                                    <p className='product-data'>{productState.brand}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Categories :</h3> 
                                    <p className='product-data'>{productState.category}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Tags :</h3> 
                                    <p className='product-data'>{productState.tags}</p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-2'>
                                    <h3 className='product-heading'>Avialability :</h3> 
                                    <p className='product-data'>In Stock</p>
                                </div>
                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h3 className='product-heading'>Size :</h3> 
                                    <div className='d-flex flex-wrap gap-15'>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>S</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>M</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>L</span>
                                        <span className='badge border border-1 bg-white text-dark border-secondary'>XL</span>
                                    </div>
                                </div>
                                <div className='d-flex gap-10 flex-column mt-2 mb-3'>
                                    <h3 className='product-heading'>Color :</h3> 
                                    <Color setColor={setColor} colorData = {productState?.color} />
                                </div>
                                <div className='d-flex align-items-center gap-15 flex-row mt-2 mb-3'>
                                    <h3 className='product-heading'>Quantity :</h3> 
                                    <div className=''>
                                        <input 
                                            type='number' 
                                            name='' 
                                            min={1}
                                            max={10}
                                            className='form-contol'
                                            style={{ width : '70px' }} 
                                            id=''
                                            onChange = {(e) => setQuantity(e.target.value)}
                                            value = {quantity} 
                                        />
                                    </div>                                        
                                    <div className='d-flex align-items-center gap-30 ms-4'>
                                        <div>
                                            <button
                                                className='button border-0 login'
                                                type='submit'
                                                onClick={() => uploadCart()}
                                                style={{ marginRight: '5px' }}
                                            >
                                                Add to Cart
                                            </button>
                                            <Link to='/login' className='button buynow'>
                                                Buy it Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center gap-30'>
                                    {userState.user !== null ? (
                                        <>
                                        <button className='p0 bg-transparent border-0'>
                                            <TbGitCompare className='fs-5 me-2' /> Add to Compare
                                        </button>
                                        <button className='p0 bg-transparent border-0'>
                                            <AiOutlineHeart className='fs-5 me-2' /> Add to Wishlist
                                        </button>
                                        </>
                                    ) : (
                                        <span>Login to Compare or Add to Wishlist</span>
                                    )}
                                </div>
                                <div className='d-flex gap-10 flex-column my-3'>
                                    <h3 className='product-heading'>Shipping & Returns :</h3> 
                                    <p className='product-data'>
                                        Free shipping and returns aviavle on all orders! <br />
                                        We ship all US Domestic orders within <b>5-10 business days! </b>
                                    </p>
                                </div>
                                <div className='d-flex gap-10 align-items-center my-3'>
                                    <h3 className='product-heading'>Product Link :</h3> 
                                    <button
                                    className='bg-transparent border-0'
                                    onClick={() => {
                                        copyToClipboard(window.location.href);
                                    }}
                                    >
                                    Click To Copy Product Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Container>
        <Container class1='description-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                    <h4>Description</h4>
                        <div className='bg-white p-3'>
                            <p dangerouslySetInnerHTML={{__html: productState?.description}} />
                        </div>
                    </div>
                </div>
        </Container>
        <Container class1='reviews-wrapper home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <h3 id='review'>Reviews</h3>
                        <div className='review-inner-wrapper'>

                            {userState.user !== null ? (
                                <div className='review-form py-4'>
                                    <h4 className='mb-2'>Write a Review</h4>
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={parseInt(productState.totalrating) || 0}
                                            edit={true}
                                            activeColor="#ffd700"
                                            onChange={(e) => {
                                                setStar(e);
                                            }}
                                        />
                                    </div> 
                                    <div>
                                        <textarea 
                                            name='' 
                                            id='' 
                                            className='w-100 form-control' 
                                            cols='30' 
                                            rows='4' 
                                            placeholder='Comments'
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button className='button border-0' onClick={addRatingToProduct} type='button'>Submit Review</button>
                                    </div>
                                </div>
                            ) : (
                                <p className='pb-5'>Login to review the product</p>
                            )}

                            <div className='review-head d-flex justify-content-between align-items-end'>
                                <div>
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                        <div className='d-flex align-items-center gap-10'>
                                        {productState?.totalrating && (
                                            <ReactStars
                                            count={5}
                                            size={24}
                                            value={parseInt(productState.totalrating)}
                                            edit={false} 
                                            activeColor="#ffd700"
                                            />
                                        )}
                                        {productState?.ratings && (
                                            <p className='mb-0 t-review'>({productState.ratings.length} reviews )</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='reviews mt-4'>
                                <div className='review'>
                                    {productState?.ratings &&
                                        productState.ratings.map((rating, index) => (
                                            <div key={index} className='review-item'>
                                                <h5 className='mb-0'>{rating.postedby}</h5>
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={parseInt(rating.star)}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                />
                                                <div className='comment mt-3'>{rating.comment}</div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Container>
        <Container class1='popular-wrapper py-5 home-wrapper-2'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>
                Our Popular Products
              </h3>
            </div>
            <div className='row'>           
            {allProductState.length > 0 ? (
                <ProductCard data={allProductState.filter(product => product.tags.includes('Popular'))} grid={4} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
          </div>
      </Container>
    </>
  )
}

export default SingleProduct