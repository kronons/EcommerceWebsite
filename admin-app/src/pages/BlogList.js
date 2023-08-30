import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Table } from "antd";
import { getBlogs, deleteABlog, resetState } from '../features/blog/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import CustomModal from "../components/CustomModal";
import parse from 'html-react-parser';

const columns = [
  {
    title: "Serial Number",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (imageURL) => <img src={imageURL} alt="No Blog" style={{ maxWidth: '100px' }} />,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();

  const [ open, setOpen ] = useState(false);
  const [ blogId, setBlogId ] = useState("");
  const [ blogTitle, setBlogTitle ] = useState("");

  const showModal = (id, title) => {
    setOpen(true);
    setBlogId(id);
    setBlogTitle(title);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);
  
  const blogState = useSelector((state) => state.blog.blogs);

  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      description: parse(blogState[i].description),
      image: blogState[i].images && blogState[i].images.length > 0 ? blogState[i].images[0].url : null,
      action: 
      <>
        <Link 
          className='fs-3 text-danger' 
          to={`/admin/blog/${blogState[i]._id}`}
        >
          <BiEdit />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(blogState[i]._id, blogState[i].title)}
        >
          <AiFillDelete />
        </button>
      </>
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
    <h3 className="mb-4 title">Blogs List</h3>
    <div>
      <Table 
          columns={columns} 
          dataSource={data1} 
        />
    </div>
    <CustomModal
        hideModal = {hideModal}
        open = {open}
        performAction = {() => {
          deleteBlog(blogId);
        }}
        title={
          <>
            Are you sure you want to delete this blog?
            <br />
             <p className='text-danger'>{blogTitle} </p>
          </>
        }
      />
</div>
  )
}

export default BlogList