import React, { useEffect } from 'react'
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

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
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders)

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: orderState[i]._id,
      name: orderState[i].orderby.firstname,
      product: orderState[i].products.map((productItem) => {
        return (
          <>
            <ul>
              <li>{i.product.title}</li>
            </ul>
          </>
        )
      }),
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      status: `London, Park Lane no. ${i}`,
      action: 
      <>
        <Link className='fs-3 text-danger' to='/'>
          <BiEdit />
        </Link>
        <Link className='ms-3 fs-3 text-danger' to='/'>
          <AiFillDelete />
        </Link>
      </>
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