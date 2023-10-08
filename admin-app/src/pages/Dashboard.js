import React, { useEffect, useState } from "react"
import { AiOutlineArrowRight } from "react-icons/ai"
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux"
import { getAMonthlyStats, getAYearlyStats } from "../features/auth/authSlice";



const columns = [
  {
    title: "Serical Number",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {

  const dispatch = useDispatch();

  const monthlyDataState = useSelector(state => state?.auth?.monthlyData);
  const yearlyDataState = useSelector(state => state?.auth?.yearlyData);

  const [ totalIncome, setTotalIncome ] = useState([]);
  const [ totalSales, setTotalSales ] = useState([]);

  useEffect(() => {
    dispatch(getAMonthlyStats());
    dispatch(getAYearlyStats());
  },[])

  useEffect(() => {
    let monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    if (monthlyDataState !== undefined) {

        let holdIncome = [];
        let holdSales = [];

        for (let index = 0; index < monthlyDataState.length; index++) {
            const element = monthlyDataState[index];
            const month = element?._id?.month;
            const year = element?._id?.year;
            const monthName = monthNames[month - 1]; // Adjust month index to start from 1
            const income = element?.amount;
            const count = element?.count;
            const label = `${monthName} ${year}`;
            holdIncome.push({ type: label, income: income });
            holdSales.push({ type: label, income: count})
        }

        setTotalIncome(holdIncome);
        setTotalSales(holdSales);
    }

}, [monthlyDataState]);

  
  const income = {
    data : totalIncome,
    xField: "type",
    yField: "income",
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

  const sales = {
    data : totalSales,
    xField: "type",
    yField: "income",
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
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Income</p> <h4 className="mb-0 sub-title">$ {yearlyDataState[0].amount}</h4> 
       </div> 
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Income Last Year <AiOutlineArrowRight /> Today</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p> <h4 className="mb-0 sub-title">{yearlyDataState[0].count}</h4> 
          </div> 
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 desc">Sales Last Year <AiOutlineArrowRight /> Today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statistics</h3>
            <div>
              <Column {...income} />
            </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statistics</h3>
            <div>
              <Column {...sales} />
            </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table 
              columns={columns} 
              dataSource={data1} 
            />
        </div>
      </div>
    </div>
  )
}

export default Dashboard