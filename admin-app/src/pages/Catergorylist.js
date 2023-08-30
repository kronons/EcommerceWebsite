import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { deleteAProductCategory, getProductCategories, resetState } from '../features/pcategory/pcategorySlice';
import CustomModal from "../components/CustomModal";


const columns = [
  {
    title: "ID Number",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Categorylist = () => {

  const dispatch = useDispatch();

  const [ open, setOpen ] = useState(false);
  const [ pcatId, setPCatId ] = useState("");
  const [ pcatTitle, setPCatTitle ] = useState("");

  const showModal = (id, title) => {
    setOpen(true);
    setPCatId(id);
    setPCatTitle(title);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, [dispatch]);

  const pCatState = useSelector((state) => state.pCategory.pCategories);
  
  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: pCatState[i]._id,
      name: pCatState[i].title,
      action: (
        <>
        <Link className='fs-3 text-danger' to={`/admin/category/${pCatState[i]._id}`}>
          <BiEdit />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(pCatState[i]._id, pCatState[i].title)}
        >
          <AiFillDelete />
        </button>
      </>
    ),

    });
  }

  const deleteProductCategory = (e) => {
    dispatch(deleteAProductCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 100);
  };

  return (
    <div>
    <h3 className="mb-4 title">Product Categories</h3>
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
          deleteProductCategory(pcatId);
        }}
        title={
          <>
            Are you sure you want to delete this product category?
            <br />
            <p className='text-danger'> {pcatTitle} </p>
          </>
        }
      />
</div>
  )
}

export default Categorylist