import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from "antd";
import { Link } from 'react-router-dom'; 
import { BiEdit } from 'react-icons/bi'; 
import { AiFillDelete } from 'react-icons/ai'; 
import { deleteACoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
import CustomModal from "../components/CustomModal";

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

  const [ open, setOpen ] = useState(false);
  const [ couponId, setCouponId ] = useState("");
  const [ couponTitle, setCouponTitle ] = useState("");

  const showModal = (id, title) => {
    setOpen(true);
    setCouponId(id);
    setCouponTitle(title);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
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
        <Link 
          to={`/admin/coupon/${couponState[i]._id}`}
          className='fs-3 text-danger' 
        >
          <BiEdit />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(couponState[i]._id, couponState[i].name)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
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
          deleteCoupon(couponId);
        }}
        title={
          <>
            Are you sure you want to delete this coupon?
            <br />
             <p className='text-danger'>{couponTitle} </p>
          </>
        }
      />
    </div>
  );
};

export default Couponlist;