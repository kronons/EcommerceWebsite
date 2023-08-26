import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Table } from "antd";
import { deleteABlogCategory, getBlogCategories, resetState } from '../features/bcategory/bcategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import CustomModal from "../components/CustomModal";


const columns = [
  {
    title: "ID Number",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogcatList = () => {

  const dispatch = useDispatch();

  const [ open, setOpen ] = useState(false);
  const [ bCatId, setBCatId ] = useState("");
  const [ bCatTitle, setBCatTitle ] = useState("");

  const showModal = (id, title) => {
    setOpen(true);
    setBCatId(id);
    setBCatTitle(title);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [dispatch]);

  const bCatState = useSelector((state) => state.bCategory.bCategories)

  const data1 = bCatState.map((bCat, i) => ({
    key: bCatState[i]._id,
    title: bCatState[i].title, 
    action: (
      <>
        <Link 
          to={`/admin/blog-category/${bCatState[i]._id}`} 
          className='fs-3 text-danger'>
          <BiEdit />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(bCatState[i]._id, bCatState[i].title)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  };

  return (
    <div>
    <h3 className="mb-4 title">Blog Categories</h3>
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
          deleteBlogCategory(bCatId);
        }}
        title={
          <>
            Are you sure you want to delete this blog category?
            <br />
             <p className='text-danger'>{bCatTitle} </p>
          </>
        }
      />
  </div>
  )
}

export default BlogcatList