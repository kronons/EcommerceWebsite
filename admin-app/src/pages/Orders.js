import React, { useEffect } from 'react'
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';

const columns = [
  {
    title: "Order Number",
    dataIndex: "key",
  },
  {
    title: "UserId",
    dataIndex: "userId",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Products",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth?.orders)

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: orderState[i]._id,
      userId: orderState[i].user,
      name: orderState[i].shippingInfo.firstName + orderState[i].shippingInfo.lastName,
      product: (
        <Link to={`/admin/order/${orderState[i]._id}`}>View Order</Link>
      ),
      amount: orderState[i].totalPriceAfterDiscount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
    });
  }

  return (
    <div>
    <h3 className="mb-4 title">Orders</h3>
    <div>
      <Table 
          columns={columns} 
          dataSource={data1} 
        />
    </div>
</div>
  )
}

export default Orders