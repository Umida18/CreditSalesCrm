"use client";

import type React from "react";
import { useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CiLocationOn } from "react-icons/ci";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/zone",
    icon: <CiLocationOn />,
    label: "Zone",
  },
  {
    key: "/workplace",
    icon: <UserOutlined />,
    label: "Workplace",
  },
  {
    key: "/collector",
    icon: <BsFillPersonLinesFill />,
    label: "Yig'uvchilar",
  },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleDesktopSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="hidden md:block min-h-screen"
    >
      <div className="flex justify-center items-center py-4">
        <p className="text-2xl font-bold text-gray-400">Admin</p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems.map((item) => ({
          ...item,
          label: (
            <Link to={item.key} className="text-gray-400 hover:text-white">
              {item.label}
            </Link>
          ),
        }))}
      />
    </Sider>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <div
      className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#001529] transform ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4">
        <p className="text-2xl font-bold text-gray-400">Admin</p>
        <Button
          type="text"
          icon={
            <MenuFoldOutlined
              style={{ color: "white" }}
              className="text-white"
            />
          }
          onClick={toggleMobileSidebar}
          className="text-white"
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems.map((item) => ({
          ...item,
          label: (
            <Link
              to={item.key}
              className="text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ),
        }))}
      />
    </div>
  );

  return (
    <Layout className="min-h-screen">
      <DesktopSidebar />
      <MobileSidebar />
      <Layout
      // className={`transition-all duration-300 ${
      //   collapsed ? "md:ml-20" : "md:ml-52"
      // }`}
      >
        <Header
          className="flex justify-between items-center "
          style={{ backgroundColor: "white" }}
        >
          <button
            // type="text"
            // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleDesktopSidebar}
            className="text-base w-16 h-16 hidden xl:flex"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
          {/* <div className=" flex justify-between items-center  text-gray-400"> */}
          <div>
            <button
              // type="text"
              // icon={<MenuUnfoldOutlined />}
              onClick={toggleMobileSidebar}
              className="text-base w-6 h-6 xl:hidden mt-3 block"
            >
              {<MenuUnfoldOutlined />}
            </button>
          </div>
          <div className="flex items-center xl:mt-0 mt-3 gap-3">
            <img
              src="/img.jpg"
              alt="Profile picture"
              className="object-cover w-12 h-12 rounded-full border border-gray-300"
            />
            <div className="text-xs">
              <p>Avaz</p>
              <p>Azizov</p>
            </div>
          </div>
          {/* </div> */}
        </Header>
        <Content
          className="m-6 p-6 min-h-[280px]"
          style={{ background: colorBgContainer }}
        >
          {children}
          <Outlet />
        </Content>
      </Layout>
      {mobileMenuOpen && (
        <div
          style={{ backdropFilter: "blur(1px)" }}
          className="md:hidden fixed inset-0 bg-white/5    bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </Layout>
  );
}
