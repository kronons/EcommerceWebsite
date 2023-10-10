import { React, useEffect } from 'react'
import CustomInput from "../components/CustomInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/pcategory/pcategorySlice";
import { Select } from "antd";
import { getColors } from "../features/color/colorSlice";
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg, resetImageState } from '../features/upload/uploadSlice';
import { createProducts, getAProduct, resetState, updateProduct } from '../features/product/productSlice';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const { Option } = Select;

let schema = Yup.object({
  title: Yup.string().required("TITLE IS REQUIRED"),
  description: Yup.string().required("DESCRIPTION IS REQUIRED"),
  price: Yup.number().required("PRICE IS REQUIRED"),
  brand: Yup.string().required("BRAND IS REQUIRED"),
  category: Yup.string().required("CATEGORY IS REQUIRED"),
  tags: Yup.string().required("TAG IS REQUIRED"),
  color: Yup.array().min(1, "AT LEAST ONE COLOR REQUIRED.").required("COLOR IS REQUIRED"),
  quantity: Yup.number().required("QUANTITY IS REQUIRED"),
  images: Yup.array().min(1, "UPLOAD OF AT LEAST ONE IMAGE IS REQUIRED").required("IMAGE IS REQUIRED"),
});

const Addproduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const getProductId = location.pathname.split('/')[3];
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { 
    isSuccess, 
    isError, 
    isLoading, 
    createdProduct,
    updatedProduct,
    productName,
    productDescription,
    productPrice,
    productBrand,
    productCategory,
    productTags,
    productColor,
    productQuantity,
    productImages,
  } = newProduct;
  

  const colorOpt = colorState.map((i) => ({
    label : i.title,
    value : i._id,
  }));

  const img = imgState.map((i) => ({
    public_id: i.public_id,
    url: i.url,
  }));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productName || "",
      description: productDescription || "",
      price: productPrice || null,
      brand: productBrand || "",
      category: productCategory || "",
      tags: productTags || "",
      color: productColor || "",
      quantity: productQuantity || null,
      images: productImages || img,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getProductId !== undefined) {
        const data = {id: getProductId, productData: values};
        dispatch(updateProduct(data))
        dispatch(resetState());
        dispatch(resetImageState());
        navigate('/');
      } 
      else {
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetImageState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  },[dispatch])

  useEffect(() => {
    if(getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    }
    else {
      dispatch(resetState());
    }
  }, [getProductId, dispatch]);

  useEffect(() => {
    if( isSuccess && createdProduct ) {
      toast.success('Product Added Successfully!');
    }
    if( isSuccess && updatedProduct) {
      toast.success('Product Updated Successfully!');
      navigate('/admin/list-products');
    }
    if(isError) {
      toast.error('Something went wrong. Product Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading, createdProduct, navigate, updatedProduct]);

  async function handleDrop(acceptedFiles) {
    try {
      // Dispatch the action and get the action object
      const action = await dispatch(uploadImg(acceptedFiles));
  
      // Extract the payload from the action object
      const response = action.payload;
  
      // Check the response structure and update formik.values.images
      if (Array.isArray(response)) {
        const images = response.map((image) => ({
          public_id: image.public_id,
          url: image.url,
          isDeleted: false, // You can set any additional properties if needed
        }));
  
        // Update formik.values.images with the uploaded images
        formik.setFieldValue('images', images);
      } else {
        console.error('Invalid response structure from server:', response);
      }
    } catch (error) {
      console.error('File upload failed:', error);
    }
  }


  return (
    <div>
        <h3 className='mb-4 title'>{ getProductId !== undefined ? "Edit" : "Add"} Product</h3>
        <div>
            <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>
                
                <CustomInput 
                  type = "text" 
                  label = "Enter Product Title" 
                  name = "title" 
                  onChng = {formik.handleChange("title")} 
                  onBlr = {formik.handleBlur("title")}
                  val={formik.values.title || ""} 
                />

                  <div className='error'>
                    {formik.touched.title && formik.errors.title}
                  </div>
                
                <div className=''>
                    <ReactQuill 
                            theme = "snow" 
                            name = "description"
                            label = "Enter Description" 
                            onChange = {formik.handleChange("description")} 
                            value = {formik.values.description}
                    />
                </div>

                  <div className='error'>
                    {formik.touched.description && formik.errors.description}
                  </div>

                <div>
                    <CustomInput 
                      type ="number" 
                      label ="Enter Product Price"                             
                      name = "price" 
                      onChng = {formik.handleChange("price")} 
                      onBlr = {formik.handleBlur("price")}
                      val = {formik.values.price || ""} 
                    />

                    <div className='error'>
                      {formik.touched.price && formik.errors.price}
                    </div>

                    <select 
                      name= "category" 
                      onChange= {formik.handleChange("category")} 
                      onBlur= {formik.handleBlur("category")}
                      value = {formik.values.category}
                      className='form-control py-3 mb-3' 
                      id=''
                    >

                        <option value=''>Select Category</option>
                        {catState.map((i, j) => {
                          return (
                            <option key={j} value={i.title}>
                              {i.title}
                            </option>   
                          )
                        })}
                    </select>

                    <div className='error'>
                      {formik.touched.category && formik.errors.category}
                    </div>

                    <select 
                      name= "tags" 
                      onChange= {formik.handleChange("tags")} 
                      onBlur= {formik.handleBlur("tags")}
                      value = {formik.values.tags}
                      className='form-control py-3 mb-3' id=''
                    >

                        <option value='Disabled'>Select Tags</option>
                        <option value='Featured'>Featured</option>
                        <option value='Popular'>Popular</option>
                        <option value='Special'>Special</option>

                    </select>

                    <div className='error'>
                      {formik.touched.tags && formik.errors.tags}
                    </div>

                    <Select
                      mode="multiple"
                      allowClear
                      className="w-100"
                      placeholder="Select colors"
                      value={Array.isArray(formik.values.color) ? formik.values.color : []} // Ensure it's always an array
                      onChange={(values) => formik.setFieldValue('color', values)} // Update formik's value for color
                    >
                      {colorOpt.map((c) => (
                        <Option key={c.value} value={c.value}>
                          <span style={{ backgroundColor: `#${c.value}`, padding: '2px 8px', color: '#000000' }}>
                            {c.label}
                          </span>
                        </Option>
                      ))}
                    </Select>

                    <div className='error'>
                      {formik.touched.color && formik.errors.color}
                    </div>

                    <select 
                      name= "brand" 
                      onChange = {formik.handleChange("brand")} 
                      onBlur = {formik.handleBlur("brand")}
                      value = {formik.values.brand}
                      className = 'form-control py-3 mb-3' 
                      id = ''
                    >
                        <option value=''>Select Brand</option>   
                        {brandState.map((i, j) => {
                          return (
                            <option key={j} value={i.title}>
                              {i.title}
                            </option>   
                          )
                        })};   
                    </select>

                    
                    <div className='error'>
                      {formik.touched.brand && formik.errors.brand}
                    </div>

                    <CustomInput 
                      type = "number" 
                      label = "Enter Product Quantity"
                      name = "quantity" 
                      onChng = {formik.handleChange("quantity")} 
                      onBlr = {formik.handleBlur("quantity")}
                      val = {formik.values.quantity || ""} 
                    />

                    <div className='error'>
                      {formik.touched.quantity && formik.errors.quantity}
                    </div>

                </div>

                <div className='bg-white border-1 p-5 text-center'>
                  <Dropzone onDrop={acceptedFiles => handleDrop(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>

                <div className='error'>
                      {formik.touched.images && formik.errors.images}
                </div>

                <div className='showimages d-flex flex-wrap gap-3 mt-3'>
                  {getProductId === undefined ? (
                    // For creating a product
                    imgState?.map((i, j) => (
                      <div className='position-relative' key={j}>
                        {i.isDeleted ? (
                          // Display nothing if the image is marked for deletion
                          null
                        ) : (
                          <>
                            <button
                              type='button'
                              onClick={() => dispatch(deleteImg(i.public_id))}
                              className='btn-close position-absolute'
                              style={{ top: '10px', right: '10px' }}
                            ></button>
                            <img src={i.url} alt='No Product' width={250} height={200} />
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    // For updating an existing product
                    formik.values.images.map((i, j) => (
                      <div className='position-relative' key={j}>
                        {i.isDeleted ? (
                          // Display nothing if the image is marked for deletion
                          null
                        ) : (
                          <>
                            <button
                              type='button'
                              onClick={() => dispatch(deleteImg(i.public_id))}
                              className='btn-close position-absolute'
                              style={{ top: '30px', right: '20px' }}
                            ></button>
                            <img src={i.url} alt='No Product' width={250} height={200} />
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{ getProductId !== undefined ? "Edit" : "Add"} Product</button>
            </form>
        </div>
    </div>
  )
}

export default Addproduct;