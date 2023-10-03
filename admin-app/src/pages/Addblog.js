import { React, useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import { deleteImg, resetImageState, uploadImg } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBlogs, getABlog, resetState, updateABlog } from "../features/blog/blogSlice";
import { getBlogCategories } from "../features/bcategory/bcategorySlice";


let schema = Yup.object({
  title: Yup.string().required("Blog Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const Addblog = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const getBlogId = location.pathname.split('/')[3];
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const newBlog = useSelector((state) => state.blog);

  const { 
        isSuccess, 
        isError, 
        isLoading, 
        createdBlogs, 
        updatedABlog, 
        blogName, 
        blogCategory, 
        blogDescription, 
        blogImages 
      } = newBlog;

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    if(getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    }
    else {
      dispatch(resetState());
    }
  }, [getBlogId, dispatch]);


  useEffect(() => {
    if( isSuccess && createdBlogs ) {
      toast.success('Blog Added Successfully!');
    }
    if( isSuccess && updatedABlog) {
      toast.success('Blog Updated Successfully!');
      navigate('/admin/list-blog');
    }
    if(isError) {
      toast.error('Something went wrong. Blog Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading, createdBlogs, navigate, updatedABlog]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      category: blogCategory|| "",
      description: blogDescription || "",
      images: blogImages || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBlogId !== undefined) {
        const data = {id: getBlogId, blogData: values};
        dispatch(updateABlog(data))
        dispatch(resetState());
        dispatch(resetImageState());
      } 
      else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetImageState());
        }, 300);
      }
    },
  });


  return (

    <div>
        <h3 className='mb-4 title'>{ getBlogId !== undefined ? "Edit" : "Add"} Blog</h3>
        
        <div className=''>
            <form action=''  onSubmit={formik.handleSubmit}>

                <div className='mt-4'>
                    <CustomInput 
                    type='text' 
                    label='Enter Blog Title' 
                    onChng = {formik.handleChange("title")} 
                    onBlr = {formik.handleBlur("title")}
                    val = {formik.values.title}
                    id = "title"
                 />
     
                  <div className='error'>
                      {formik.touched.title && formik.errors.title}
                  </div>
                    
                </div>
                
                <select 
                  name='category' 
                  onChange= {formik.handleChange("category")} 
                  onBlur= {formik.handleBlur("category")}
                  value = {formik.values.category}
                  className='form-control py-3 mb-3' 
                  id=''
                >
                    <option value=''>Select Blog Category</option>
                    {bCatState.map((i, j) => {
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

                <ReactQuill 
                    theme= "snow" 
                    name = "description"
                    onChange = {formik.handleChange("description")} 
                    value = {formik.values.description}
                  />
         
                <div className='error'>
                      {formik.touched.description && formik.errors.description}
                </div>

                <div className='bg-white border border-1 p-5 text-center'>
                  <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
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

                <div className='showimages d-flex flex-wrap gap-3 mt-3'>
                  {getBlogId === undefined ? (
                    // For creating a new blog
                    imgState?.map((i, j) => (
                      <div className='position-relative' key={j}>
                        <button
                          type='button'
                          onClick={() => dispatch(deleteImg(i.public_id))}
                          className='btn-close position-absolute'
                          style={{ top: '10px', right: '10px' }}
                        ></button>
                        <img src={i.url} alt='No Blog' width={250} height={200} />
                      </div>
                    ))
                  ) : (
                    // For updating an existing blog
                    formik.values.images.map((i, j) => (
                      <div className='position-relative' key={j}>
                        <button
                          type='button'
                          onClick={() => dispatch(deleteImg(i.public_id), dispatch(resetImageState()))}
                          className='btn-close position-absolute'
                          style={{ top: '10px', right: '10px' }}
                        ></button>
                        <img src={i.url} alt='No Blog' width={250} height={200} />
                      </div>
                    ))
                  )}
                </div>

                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">{ getBlogId !== undefined ? "Edit" : "Add"} Blog</button>
            
            </form>
        </div>
    </div>
  )
}

export default Addblog