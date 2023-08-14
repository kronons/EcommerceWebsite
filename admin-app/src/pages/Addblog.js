import { React, useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { createBlogs, getBlogs, resetState } from "../features/blog/blogSlice";
import { getBlogCategories } from '../features/bcategory/bcategorySlice';

let schema = Yup.object({
  title: Yup.string().required("Blog Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const Addblog = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ images, setImages ] = useState([]);

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getBlogCategories())
  }, [dispatch])


  const imgState = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blog.blogs);
  const bCatState = useSelector((state) => state.bCategory.bCategories);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id : i.public_id,
      url: i.url,
    })
  });

  const { isSuccess, isError, isLoading, createdBlogs } = newBlog;
  useEffect(() => {
    if( isSuccess && createdBlogs ) {
      toast.success('Blog Added Successfully!');
    }
    if(isError) {
      toast.error('Something went wrong. blog Added Unsuccessfull!');
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Used to test values
      // alert(JSON.stringify(values));
      dispatch(createBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState())
      }, 3000);
    },
  });

  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
      setDesc(e);
  };

  return (

    

    <div>
        <h3 className='mb-4 title'>Add Blog</h3>
        
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

                <div className='bg-white border-1 p-5 text-center'>
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

                <div className='showimages d-flex flex-wrap gap-3'>
                      {imgState?.map ((i, j) => {
                        return(
                          <div className='position-relative' key={j}>
                            <button 
                              type = "button"
                              onClick={() => dispatch(deleteImg(i.public_id))}
                              className='btn-close position-absolute' 
                              style={{ top: "10px", right: "10px"}}
                            >

                            </button>

                            <img src={i.url} alt='' width={250} height={200}/>
                          </div>
                        );
                      })}
                </div>

                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">Add Blog</button>
            
            </form>
        </div>
    </div>
  )
}

export default Addblog