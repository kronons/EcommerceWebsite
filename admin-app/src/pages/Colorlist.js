import React, { useEffect, useState } from 'react';
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
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
    title: "Action",
    dataIndex: "action",
  },
];

const Colors= () => {

  const dispatch = useDispatch();

  const [ open, setOpen ] = useState(false);
  const [ colorId, setcolorId ] = useState("");
  const [ colorTitle, setcolorTitle ] = useState("");

  const showModal = (id, title) => {
    setOpen(true);
    setcolorId(id);
    setcolorTitle(title);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);
  
  const colorState = useSelector((state) => state.color.colors)

  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: colorState[i]._id,
      name: colorState[i].title,
      action: 
      <>
        <Link 
          className='fs-3 text-danger' 
          to={`/admin/color/${colorState[i]._id}`}
        >
          <BiEdit />
        </Link>
        <button 
          className='ms-3 fs-3 text-danger bg-transparent border-0'
          onClick={() => showModal(colorState[i]._id, colorState[i].title)}
        >
          <AiFillDelete />
        </button>
      </>
    });
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

return (
    <div>
    <h3 className="mb-4 title">Color List</h3>
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
          deleteColor(colorId);
        }}
        title={
          <>
            Are you sure you want to delete this color?
            <br />
            <p className='text-danger'> {colorTitle} </p>
          </>
        }
      />
</div>
  )
}

export default Colors