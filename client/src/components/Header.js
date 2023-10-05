import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/user/userSlice'



const Header = () => {

  const dispatch = useDispatch();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const userCartState = useSelector(state => state.auth.cart);
  const userState = useSelector(state => state.auth);

  let total = 0;
  let subTotal = 0;
  let totalItems = 0;

  const logAUserOut = () => {
    dispatch(logoutUser());
  }

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
                <Link className='text-white'>DevCorner</Link>
              </h2>
            </div>
            <div className='col-5'>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control py-2" 
                placeholder="Search Product Name" 
                aria-label="Search Product Name" 
                aria-describedby="basic-addon2"
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
                <Link to='/login' className='d-flex align-items-center gap10 text-white'>
                  <img src="/images/user.svg" alt="user" />
                  {userState !== null && userState.user !== null ? (
                    <div className='dropdown' onMouseEnter={() => setIsDropdownVisible(true)} onMouseLeave={() => setIsDropdownVisible(false)}>
                            <button className='btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center' type='button' id='dropdownMenuButton1'>
                              Welcome, {userState.user.firstname.charAt(0).toUpperCase() + userState.user.firstname.slice(1)} <br />
                            </button>
                            <ul className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`} aria-labelledby='dropdownMenuButton1'>
                              {/* Dropdown content */}
                              <li>
                                <span className='dropdown-item' onClick={logAUserOut}>
                                  Logout
                                </span>
                              </li>
                            </ul>
                          </div>

                    
                  ) : (
                    <Link to="/login">
                      <p className='mb-0 text-white'>  
                        Login <br /> My Account
                      </p>
                    </Link>
                  )}
                </Link>
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
            <div className='menu-bottom d-flex align-items-center gap-30'>
              <div>
                <div className="dropdown">
                  <button 
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" 
                    type="button" id="dropdownMenuButton1" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <img src='images/menu.svg' alt='' />
                    <span className='me-5 d-inline-block'>Shop Categories</span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Action 
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="#">
                        Something else here
                      </Link>
                    </li>
                  </ul>
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