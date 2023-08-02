import React from "react"
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs"
import { Column } from "@ant-design/plots";
import { Table } from 'antd';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {

  const data = [
    {
      type: "January",
      sales: 38,
    },
    {
      type: "February",
      sales: 52,
    },
    {
      type: "March",
      sales: 61,
    },
    {
      type: "April",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "June",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Augest",
      sales: 38,
    },
    {
      type: "September",
      sales: 38,
    },
    {
      type: "October",
      sales: 38,
    },
    {
      type: "November",
      sales: 38,
    },
    {
      type: "December",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {

      return "#ffd333";
    
    },

    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total</p> <h4 className="mb-0">$1000</h4> 
       </div> 
          <div className="d-flex flex-column align-items-end">
            <h6> <BsArrowDownRight /> 32%</h6>
            <p className="mb-0">Compared to April 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total</p> <h4 className="mb-0">$1000</h4> 
          </div> 
          <div className="d-flex flex-column align-items-end">
            <h6 className="red"> <BsArrowDownRight /> 32%</h6>
            <p className="mb-0">Compared to April 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="">Total</p> <h4 className="mb-0">$1000</h4> 
          </div> 
          <div className="d-flex flex-column align-items-end">
            <h6 className="green"> <BsArrowDownRight /> 32%</h6>
            <p className="mb-0">Compared to April 2023</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Statistics</h3>
        <div>
          <Column {...config} />
        </div>
        <div className="mt-4">
          <h3 className="mb-4">Recent Orders</h3>
          <div>
            <Table 
              columns={columns} 
              dataSource={data1} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard