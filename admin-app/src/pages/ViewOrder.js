import React, { useEffect } from 'react';
import { Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByOrderId, resetState } from '../features/auth/authSlice';
import { BiArrowBack } from 'react-icons/bi';
import { getProducts } from '../features/product/productSlice';

const columns = [
  {
    title: "Product ID",
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

  const orderId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(resetState());
    dispatch(getOrderByOrderId(orderId));
    dispatch(getProducts());
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state.auth.orderbyorderid);
  const productState = useSelector((state) => state.product.products);

  const data = orderState?.orderItems?.map(product => {

    const selectedProduct = productState?.find(p => p._id === product?.product);

    return {
      key: product.product,
      productName: selectedProduct ? selectedProduct.title : "Product Not Found",
      productDescription: selectedProduct ? selectedProduct.description : "Description Not Found",
      amount: product.quantity,
      date: new Date(orderState.createdAt).toLocaleString(), 
      status: orderState.orderStatus, 
    };
  });

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