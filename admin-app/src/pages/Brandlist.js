import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "antd";
import { Link } from 'react-router-dom'; 
import { BiEdit } from 'react-icons/bi'; 
import { AiFillDelete } from 'react-icons/ai'; 
import { getBrands, resetState, deleteABrand } from '../features/brand/brandSlice';
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "ID Number", 
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action", 
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const dispatch = useDispatch(); 
  
  const [ open, setOpen ] = useState(false);
  const [ brandId, setbrandId ] = useState("");
  const [ brandTitle, setbrandTitle ] = useState("");

  const showModal = (id, title) => {
    setOpen(true);
    setbrandId(id);
    setbrandTitle(title);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands()); 
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  
  const data1 = brandState.map((brand, i) => ({
    key: brandState[i]._id,
    name: brandState[i].title, 
    action: (
      <>
        <Link 
          to={`/admin/brand/${brandState[i]._id}`} 
          className='fs-3 text-danger'>
          <BiEdit />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(brandState[i]._id, brandState[i].title)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table
          columns = {columns}
          dataSource = {data1}
        />
      </div>
      <CustomModal
        hideModal = {hideModal}
        open = {open}
        performAction = {() => {
          deleteBrand(brandId);
        }}
        title={
          <>
            Are you sure you want to delete this brand?
            <br />
             <p className='text-danger'>{brandTitle} </p>
          </>
        }
      />
    </div>
  );
};

export default Brandlist;