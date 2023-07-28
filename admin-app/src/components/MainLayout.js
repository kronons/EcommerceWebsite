import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Layout, Menu, Button, theme } from "antd";

import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineBgColors } from "react-icons/ai";
import { LiaUserSolid  } from "react-icons/lia";
import { SiBrandfolder  } from "react-icons/si";
import { BiCategoryAlt, BiLogoBlogger  } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { BsFillMenuAppFill, BsFillMenuButtonWideFill  } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

// Default collapse menu icons
//import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">DC</span>
            <span className="lg-logo">Dev Corner</span>
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
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt  className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt  className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors  className="fs-4" />,
                  label: "Color",
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
                  key: "blog-list",
                  icon: <BiLogoBlogger className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
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
          <div className="d-flex gap-3 align-items-center">
            <div></div>
              <div className="d-flex gap-3 align-items-center">
                <div>
                  <img
                    src="https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg" 
                    alt="" 
                    style={{ maxWidth: '100%', height: '64px' }}
                  />
                </div>
              <div>
                <h5 className="mb-0">Kongmeng Xiong</h5>
                <p className="mb-0">kongmengxiong479@gmail.com</p>
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;