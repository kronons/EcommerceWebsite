import React, { useEffect } from 'react'
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateAOrder } from '../features/auth/authSlice';

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
  {
    title: "Status",
    dataIndex: "action",
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
      action: (
        <>
          <select 
            className='form-control form-select'
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) => updateOrderStatus(orderState[i]._id, e.target.value)}
          >
              <option value="Ordered" disabled>Ordered</option>

              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
          </select>
        </>
        ),
    });
  }

  const updateOrderStatus = (id, status) => {
    dispatch(updateAOrder({id: id, status: status}))
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