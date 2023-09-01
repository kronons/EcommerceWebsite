import React, { useEffect } from 'react';
import { Table } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByUser, resetState } from '../features/auth/authSlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

const columns = [
  {
    title: "ID Number",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
  },
  {
    title: "Description",
    dataIndex: "productDescription",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(resetState());
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderState = useSelector((state) => state.auth.orderbyuser);

  const data = [];

  if (orderState && orderState.products) {
    const productsArray = orderState.products;

    for (const product of productsArray) {
      data.push({
        key: product.product._id,
        productName: product.product.title,
        productDescription: product.product.description,
        amount: product.product.price * product.count,
        date: new Date(orderState.createdAt).toLocaleString(),
        status: orderState.orderStatus,
      });
    }
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className="mb-4 title">View User Order</h3>
        <button
          className='bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1'
          onClick={goBack}
        >
          <BiArrowBack className='fs-5' /> <h5 className='mt-1'>Go Back</h5>
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;