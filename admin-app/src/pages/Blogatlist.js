import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { Table } from "antd";
import { getBlogCategories } from '../features/bcategory/bcategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const columns = [
  {
    title: "ID Number",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
];

const BlogatList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [dispatch]);

  const blogatState = useSelector((state) => state.bCategory.bCategories)

  const data1 = [];
  for (let i = 0; i < blogatState.length; i++) {
    data1.push({
      key: blogatState[i]._id,
      title: blogatState[i].title,
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
    <h3 className="mb-4 title">Blog Categories</h3>
    <div>
      <Table 
          columns={columns} 
          dataSource={data1} 
        />
    </div>
</div>
  )
}

export default BlogatList