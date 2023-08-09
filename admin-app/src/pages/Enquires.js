import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries } from '../features/enquiry/enquirySlice';
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Comment",
    dataIndex: "comment",
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

const Enquires = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: enquiryState[i]._id,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: enquiryState[i].status,
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
        <h3 className="mb-4 title">Enquires</h3>
        <div>
          <Table 
              columns={columns} 
              dataSource={data1} 
            />
        </div>
    </div>
  )
}

export default Enquires