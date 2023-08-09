import React, { useEffect } from 'react'
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { getColors } from '../features/color/colorSlice';

const columns = [
  {
    title: "Serial Number",
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

  useEffect(() => {
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
    <h3 className="mb-4 title">Colors</h3>
    <div>
      <Table 
          columns={columns} 
          dataSource={data1} 
        />
    </div>
</div>
  )
}

export default Colors