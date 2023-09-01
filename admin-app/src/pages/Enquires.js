import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAEnquiry, getEnquiries, resetState, updateEnquiry } from '../features/enquiry/enquirySlice';
import { AiOutlineEye, AiFillDelete } from 'react-icons/ai'
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

const Enquires = () => {

  const dispatch = useDispatch();

  const [ open, setOpen ] = useState(false);
  const [ enquiresId, setEnquiresId ] = useState("");
  const [ enquiresTitle, setEnquiresTitle ] = useState("");

  const showModal = (id, title) => {
    setOpen(true);
    setEnquiresId(id);
    setEnquiresTitle(title);
  };

  const hideModal = () => {
    setOpen(false);
  };
  
  const setEnquiryStatus = (e, i) => {
    const data = {id: i, enqData: e};
    dispatch(updateEnquiry(data));
  };

  useEffect(() => {
    dispatch(resetState());
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
      date: new Date(enquiryState[i].createdAt).toLocaleString(),
      status: (
        <>
          <select 
            defaultValue={enquiryState[i].status} 
            className='form-contol form-select'
            onChange={(e) => setEnquiryStatus(e.target.value, enquiryState[i]._id)}
          >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: 
      <>
        <Link 
          className='fs-3 text-danger' 
          to={`/admin/enquires/${enquiryState[i]._id}`}
        >
          <AiOutlineEye />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(enquiryState[i]._id, enquiryState[i].name)}
        >
          <AiFillDelete />
        </button>
      </>
    });
  }
  
  const deleteEnquires = (e) => {
    dispatch(deleteAEnquiry(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
        <h3 className="mb-4 title">Enquires</h3>
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
          deleteEnquires(enquiresId);
        }}
        title={
          <>
            Are you sure you want to delete this enquiry?
            <br />
            <p className='text-danger'> {enquiresTitle} </p>
          </>
        }
      />
    </div>
  )
}

export default Enquires