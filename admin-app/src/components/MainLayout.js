import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineBgColors } from "react-icons/ai";
import { LiaUserSolid  } from "react-icons/lia";
import { SiBrandfolder  } from "react-icons/si";
import { BiCategoryAlt, BiLogoBlogger, BiSolidCoupon  } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { BsFillMenuAppFill, BsFillMenuButtonWideFill  } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";


const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const logAUserOut = () => {
    navigate("/");
    localStorage.clear();
    window.location.reload();
    
  }

  return (
    // Commented out code is to disable right click on website
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">KMX</span>
            <span className="lg-logo">KMX Admin Panel</span>
          </h2>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({key}) => {
            if (key === "signout") {

            }
            else {
              navigate(key);
            }
          }}

          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <LiaUserSolid className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "add-brand",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "add-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt  className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "add-color",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Color",
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors  className="fs-4" />,
                  label: "Color List",
                },
              ]
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <BiSolidCoupon className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "add-coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "list-coupon",
                  icon: <BiSolidCoupon className="fs-4" />,
                  label: "Coupon List",
                },
              ]
            },
            {
              key: "blog",
              icon: <BiLogoBlogger className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "list-blog",
                  icon: <BiLogoBlogger className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "add-blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "list-blog-category",
                  icon: <BiLogoBlogger className="fs-4" />,
                  label: "Blog Category List",
                },
              ]
            },
            {
              key: "enquires",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquires",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header 
        className="d-flex justify-content-between ps-1 pe-5"
        style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <BsFillMenuAppFill /> : <BsFillMenuButtonWideFill />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
                <IoMdNotifications className="fs-4" />
                <span className="badge bg-warning rounded-circle p-1 position-absolute">
                  3
                </span>
            </div>
              <div className="d-flex gap-3 align-items-center dropdown">
                <div>
                  <img
                    width={52}
                    height={32}
                    src="https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg" 
                    alt="" 
                  />
                </div>
              <div                 
                role="button" 
                id="dropdownMenuLink" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <h5 className="mb-0">Kongmeng Xiong</h5>
                <p className="mb-0">kongmengxiong479@gmail.com</p>
              </div>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><Link className="dropdown-item py-1 mb-1" style={{height: "auto", lineHeight: "20px"}} to="/">View Profile (WIP)</Link></li>
                  <li><p className="dropdown-item py-1 mb-1" style={{height: "auto", lineHeight: "20px"}} onClick={logAUserOut}>Log Out</p></li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;