import React, { useEffect } from 'react'
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { getProductCategories } from '../features/pcategory/pcategorySlice';

const columns = [
  {
    title: "ID Number",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Categorylist = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  const pCatState = useSelector((state) => state.pCategory.pCategories);
  
  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: pCatState[i]._id,
      name: pCatState[i].title,
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
    <h3 className="mb-4 title">Product Categories</h3>
    <div>
      <Table 
          columns={columns} 
          dataSource={data1} 
        />
    </div>
</div>
  )
}

export default Categorylist