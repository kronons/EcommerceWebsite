import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "antd";
import { Link } from 'react-router-dom'; 
import { BiEdit } from 'react-icons/bi'; 
import { AiFillDelete } from 'react-icons/ai'; 
import { getCoupons } from '../features/coupon/couponSlice';

const columns = [
  {
    title: "ID Number", 
    dataIndex: "key",
  },
  {
    title: "Coupon Code",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Date of Expiration",
    dataIndex: "expired",
    sorter: (a, b) => new Date(a.expired) - new Date(b.expired),
  },
  {
    title: "Action", 
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getCoupons()); 
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);

  const data1 = couponState.map((coupon, i) => ({
    key: couponState[i]._id,
    name: couponState[i].name,
    discount: couponState[i].discount, 
    expired: new Date(couponState[i].expired).toLocaleString(),
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
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table
          columns={columns}
          dataSource={data1}
        />
      </div>
    </div>
  );
};

export default Couponlist;