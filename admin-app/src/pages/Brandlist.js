import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "antd";
import { Link } from 'react-router-dom'; 
import { BiEdit } from 'react-icons/bi'; 
import { AiFillDelete } from 'react-icons/ai'; 
import { getBrands } from '../features/brand/brandSlice';

const columns = [
  {
    title: "Serial Number", 
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

  useEffect(() => {
    dispatch(getBrands()); 
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = brandState.map((brand, i) => ({
    key: i + 1,
    name: brandState[i].title, 
    product: 32,
    status: `London, Park Lane no. ${i}`,
    action: (
      <>
        <Link className='fs-3 text-danger' to='/'>
          <BiEdit />
        </Link>
        <Link className='ms-3 fs-3 text-danger' to='/'>
          <AiFillDelete />
        </Link>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data1}
        />
      </div>
    </div>
  );
};

export default Brandlist;