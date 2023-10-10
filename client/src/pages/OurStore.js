import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Meta from '../components/Meta'
//import ReactStars from 'react-rating-stars-component'
import ProductCard from '../components/ProductCard';
//import Color from '../components/Color';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/products/productSlice';
import { useCategory } from '../context';


const OurStore = () => {

    const dispatch = useDispatch();
    const { selectedCategory } = useCategory();

    const productState = useSelector((state) => state.product.products);

    const [ grid , setGrid ] = useState(4);
    const [ brands, setBrands] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ tags, setTags] = useState([]);
    //const [ color, setColor] = useState([]);
    
    // Filter States
    const [ tag, setTag] = useState(null);
    const [ category, setCategory] = useState(null);
    const [ brand, setBrand] = useState(null);
    const [ minPrice, setMinPrice] = useState(null);
    const [ maxPrice, setMaxPrice] = useState(null);
    const [ sort, setSort] = useState(null);
    

    useEffect(() => {
        let newBrands = [];
        let newCategories = [];
        let newTags = [];
        //let newColors = [];
        for (let index = 0; index < productState.length; index++) {
            const element = productState[index];
            newBrands.push(element.brand);
            newCategories.push(element.category);
            newTags.push(element.tags)
            //newColors.push(element.color)
        };
    
        setBrands(newBrands);
        setCategories(newCategories);
        setTags(newTags);
        //setColor(newColors);
    }, [productState]); 

    useEffect(() => {
        const getProducts = () => {
            dispatch(getAllProducts({ sort, tag, brand, category, minPrice, maxPrice }));
        };

        if(category === null && selectedCategory !== null) {
            setCategory(selectedCategory);
        }

        getProducts();
    }, [sort, tag, brand, category, minPrice, maxPrice, dispatch,selectedCategory]);




  return (
    <>
        <Meta title={'Our Store'}/>
        <Breadcrumb title='Our Store' />
        <Container class1='store-wrapper home-wrapper-2 py-5'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Shop By Categories</h3>
                            <ul className='ps-0'>
                                {
                                    categories && [...new Set(categories)].map(( item, index) => {
                                        return <li key={index} onClick={() => setCategory(item)}>{item}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className='filter-card mb-3'>
                            {/* TODO: Filter By Avaiable */}
                            {/* <h3 className='filter-title'>Filter By</h3>
                            <div>
                                <h5 className='sub-title'>Availability</h5>
                            <div>
                            <div className='form-check'>
                                    <input 
                                        className="form-check-input" 
                                        type='checkbox' 
                                        value={''} 
                                        id='' 
                                    />
                                    <label className='form-check-label' htmlFor=''>
                                        In Stock (1)
                                    </label>
                                </div>
                                <div className='form-check'>
                                    <input 
                                        className="form-check-input" 
                                        type='checkbox' 
                                        value={''} 
                                        id='' 
                                    />
                                    <label className='form-check-label' htmlFor=''>
                                        Out of stock (0)
                                    </label>
                                </div>
                            </div>
                            </div> */}
                                <h5 className='sub-title'>Price</h5>
                                <div className='d-flex align-items-center gap-10'>
                                    <div className="form-floating">
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="floatingInput" 
                                            placeholder="From"
                                            onChange={(e) => setMinPrice(e.target.value)} 
                                        />
                                        <label htmlFor="floatingInput">From</label>
                                    </div>
                                    <div className="form-floating">
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="floatingInput1" 
                                            placeholder="To" 
                                            onChange={(e) => setMaxPrice(e.target.value)} 
                                        />
                                        <label htmlFor="floatingInput1">To</label>
                                    </div>
                                </div>
                                <div className='mt-4 mb-3'>
                                    <h3 className='sub-title'>
                                        Product Tags
                                    </h3>
                                    <div>
                                        <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                        {
                                            tags && [...new Set(tags)].map(( item, index) => {
                                                return (<span onClick={() => setTag(item)} key={index} className='pbuttons text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3'>{item}</span>)
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4 mb-3'>
                                    <h3 className='sub-title'>
                                        Product Brands
                                    </h3>
                                    <div>
                                        <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                        {
                                            brands && [...new Set(brands)].map(( item, index) => {
                                                return (<span onClick={() => setBrand(item)} key={index} className='pbuttons text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3'>{item}</span>)
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                                {/* TODO: Add Filter Color */}
                                {/* <h5 className='sub-title'>
                                    Colors
                                </h5>
                                <div>
                                    <div>
                                        <Color />
                                    </div>
                                </div> */}
                                {/* TODO: FILTER BY SIZE}
                                {/* <h5 className='sub-title'>Size</h5>
                                <div>
                                <div className='form-check'>
                                    <input 
                                        className="form-check-input" 
                                        type='checkbox' 
                                        value={''} 
                                        id='color-1' 
                                    />
                                    <label className='form-check-label' htmlFor=''>
                                        S (2)
                                    </label>
                                </div>
                                <div className='form-check'>
                                    <input 
                                        className="form-check-input" 
                                        type='checkbox' 
                                        value={''} 
                                        id='color-2' 
                                    />
                                    <label className='form-check-label' htmlFor=''>
                                        M (2)
                                    </label>
                                </div>
                                </div> */}
                        </div>
                        {/* NOT SURE: May or May Not Use*/}
                        {/* <div className='filter-card mb-3'>
                            <h3 className='filter-title'>Random Products</h3>
                            <div>
                            <div className='random-products d-flex mb-3'>
                                <div className='w-50'>
                                    <img 
                                        src='images/watch.jpg' 
                                        className='img-fluid' 
                                        alt='watch' />
                                </div>
                                <div className='w-50'>
                                    <h5>Kids headphones buld 10 pack multi colored for students</h5>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={4}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                <b>$ 300</b>
                                        </div>
                                    </div>
                            <div className='random-products d-flex'>
                        <div className='w-50'>
                            <img 
                                src='images/watch.jpg' 
                                className='img-fluid' 
                                alt='watch' />
                        </div>
                        <div className='w-50'>
                            <h5>Kids headphones buld 10 pack multi colored for students</h5>
                            <ReactStars
                                count={5}
                                size={24}
                                value={4}
                                edit={false}
                                activeColor="#ffd700"
                            />
                        <b>$ 300</b>
                                </div>
                                    </div>
                                    
                                </div>
                            </div> */}
                        </div>
                    <div className='col-9'>
                        <div className='filter-sort-grid mb-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className='mb-0 d-block' style={{ width: '100px' }}>Sort By: </p>
                                    <select 
                                        name=''
                                        defaultValue={'manual'}
                                        className='form-control form-select'
                                        id=''
                                        onChange={(e) => setSort(e.target.value)}
                                    >
                                    <option value='title'>Alphabetically A-Z</option> 
                                    <option value='-title'>Alphabetically Z-A</option>   
                                    <option value='price'>Price: Low to High</option> 
                                    <option value='-price'>Price: High to Low</option> 
                                    <option value='createdAt'>Date: Old to New</option> 
                                    <option value='-createdAt'>Date: New to Old</option>         
                                    </select>
                                </div>
                                <div className='d-flex align-items-center gap-10'>
                                    <p className='totalproducts mb-0'>21 Products</p>
                                    <div className='d-flex gap-10 align-items-center grid'>
                                        <img 
                                            onClick={() => {setGrid(3)}}
                                            src='images/gr4.svg' 
                                            className='d-block img-fluid' 
                                            alt='grid' 
                                        />
                                        <img 
                                            onClick={() => {setGrid(4)}}
                                            src='images/gr3.svg' 
                                            className='d-block img-fluid' 
                                            alt='grid' 
                                        />
                                        <img 
                                            onClick={() => {setGrid(6)}}
                                            src='images/gr2.svg' 
                                            className='d-block img-fluid' 
                                            alt='grid' 
                                        />
                                        <img 
                                            onClick={() => {setGrid(12)}}
                                            src='images/gr.svg' 
                                            className='d-block img-fluid' 
                                            alt='grid' 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='products-list pb-5'>
                            <div className='d-flex gap-10 flex-wrap'>
                                {productState.length > 0 ? (
                                    <ProductCard data={productState} grid={grid} />
                                ) : (
                                <p>Loading...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        </Container>
    </>
  )
}

export default OurStore