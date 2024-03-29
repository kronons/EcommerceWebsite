import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { BiCategoryAlt} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'; 
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useCategory } from '../context'



const Header = () => {

  const navigate = useNavigate();
  const { setSelectedCategory } = useCategory();

  // States
  const userCartState = useSelector(state => state.auth.cart);
  const userState = useSelector(state => state.auth);
  const productState = useSelector(state => state?.product?.products)

  // State Variables
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [categories, setCategories] = useState([]);

  const [isCustomDropdownVisible, setIsCustomDropdownVisible] = useState(false);



  useEffect(() => {

    let newCategories = [];

    for (let index = 0; index < productState.length; index++) {
        const element = productState[index];
        newCategories.push(element.category);
    };
    const uniqueCategories = Array.from(new Set(newCategories));
    setCategories(uniqueCategories);
}, [productState]); 


  let total = 0;
  let subTotal = 0;
  let totalItems = 0;

  const logAUserOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  const redirectToProfile = () => {
    navigate('/my-profile');
  };

  useEffect(() => {
    let data = [];
    for(let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({id:index,prod:element?._id,name:element?.title})
    }
    setProductOptions(data);
  }, [productState]); 

  return (
    <>
      <header className='header-top-strip py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6' >
              <p className='text-white mb-0'>
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className='col-6' >
              <p className='text-end text-white mb-0'>
                HotLine:{" "}
                <a className='text-white' href="tel:(800) 123-4567">(800) 123-4567</a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className='header-upper py3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>
              <h2>
                <Link to="/" className='text-white'>KMX Store</Link>
              </h2>
            </div>
            <div className='col-5'>
            <div className="input-group">
            <Typeahead
              id="pagination-example"
              onPaginate={() => console.log('Results paginated')}
              onChange={(selected) => {
                if(selected[0] !== undefined) {
                  setPaginate(selected[0]);
                  navigate(`/product/${selected[0].prod}`)
                }
                
              }}
              options={productOptions}
              paginate={paginate}
              labelKey={"name"}
              minLength={2}
              placeholder="Search Products..."
            />
              <span className="input-group-text py-3" id="basic-addon2">
                <BsSearch className='fs-6'/>
              </span>
          </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center gap-3'>
                
                <div>
                  <Link 
                    to='/compare-product' 
                    className='d-flex align-items-center gap10 text-white'
                  >
                    <img src="/images/compare.svg" alt="compare" />
                    <p className='mb-0 ms-2'>
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>

                <div className='ms-3'>
                  <Link to='/wishlist' className='d-flex align-items-center gap10 text-white'>
                    <img src="/images/wishlist.svg" alt="wishlist" />
                    <p className='mb-0 ms-2'>
                      Favorite <br /> WishList
                    </p>
                  </Link>
                </div>
                
                <div className='ms-3 dropdown'>
                  <div 
                    className={`d-flex align-items-center gap10 text-white dropdown ${isUserMenuVisible ? 'show' : ''}`} 
                    onMouseEnter={() => setIsUserMenuVisible(true)} 
                    onMouseLeave={() => setIsUserMenuVisible(false)}
                  >
                    <img src="/images/user.svg" alt="user" />
                    <div className="dropdown-content">
                      {userState !== null && userState.user !== null ? (
                        <>
                          <button 
                            className='btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center' 
                            type='button' 
                            id='dropdownMenuButton1'
                            onClick={redirectToProfile}
                          >
                            Welcome, {userState.user.firstname.charAt(0).toUpperCase() + userState.user.firstname.slice(1)} <br />
                          </button>
                          <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                            {/* Dropdown content */}
                            <li>
                              <NavLink to='/my-orders' className='dropdown-item'>My Orders</NavLink>
                            </li>
                            <li>
                              <NavLink to='/my-profile' className='dropdown-item'>My Profile</NavLink>
                            </li>
                            <li>
                              <span className='dropdown-item' onClick={logAUserOut}>
                                Logout
                              </span>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <div className='d-flex align-items-center gap10 text-white'>
                          <NavLink to="/login">
                            <p className='mb-0 ms-2  text-white'>Login <br /> My Account</p>
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </div>
                </div>


                <div>
                  <Link 
                    to='/cart' 
                    className='d-flex align-items-center text-white'
                  >
                      <img src="/images/cart.svg" alt="cart" className='' />
                      {userCartState && userCartState.length > 0 && userCartState.map((item, index) => {
                          total = item?.price * item.quantity;
                          subTotal += total;
                          totalItems += item.quantity;
                          return null;
                      })}
                      <div className='d-flex flex-column gap-20'>
                        <span className='badge bg-white text-dark'>{totalItems} items</span>
                        <p className='mb-0'>$ {subTotal}</p>
                      </div>
                  </Link>
                </div>

              </div>
          </div>
        </div>
      </div>
    </header>
    <header className='header-bottom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className='ms-3 custom-dropdown'> {/* Renamed the class here */}
                  <div className={`d-flex align-items-center gap10 text-white custom-dropdown ${isCustomDropdownVisible ? 'show' : ''}`}>
                    <button className="btn btn-secondary bg-transparent border-0 gap-15 d-flex align-items-center" 
                      type="button" 
                      onClick={() => setIsCustomDropdownVisible(!isCustomDropdownVisible)}
                    >
                      <img src="images/menu.svg" alt="" />
                      <span className="me-5 d-inline-flex align-items-center">
                        <BiCategoryAlt size={25} style={{ marginRight: '5px' }} />
                        Shop Categories
                      </span>
                    </button>
                    {isCustomDropdownVisible && (
                      <ul className="dropdown-menu2" aria-labelledby="dropdownMenuButton1">
                        {categories.map((category, index) => (
                              <NavLink 
                                  to={`/product`} 
                                  className='text-dark dropdown-item2'
                                  onClick={() => {setIsCustomDropdownVisible(!isCustomDropdownVisible); setSelectedCategory(category) } }
                                  key={index}
                              >
                                  <li className="dropdown-item2-category">
                                      {category}
                                  </li>
                              </NavLink>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              <div className='menu-links'>
                <div className='d-flex align-items-center gap 15'>
                  <NavLink to='/'>Home</NavLink>
                  <NavLink to='/product'>Our Store</NavLink>
                  <NavLink to='/blogs'>Blogs</NavLink>
                  <NavLink to='/contact'>Contact US</NavLink>
                </div>  
              </div>  
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
  )
}

export default Header