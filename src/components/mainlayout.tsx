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

import { Outlet } from "react-router-dom";

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
    label: "Collector",
  },
  {
    key: "/collectorMoney",
    icon: <BsFillPersonLinesFill />,
    label: "Yig'uvchilar",
  },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical " />
        <div className="flex justify-center items-center">
          <p className="text-[26px] font-bold text-[#bfbfbf] py-4">Admin</p>
        </div>
        <Menu
          style={{ backgroundColor: "#001529" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={menuItems.map((item) => ({
            ...item,
            label: (
              <a href={item.key} style={{ color: "#bfbfbf" }}>
                {item.label}
              </a>
            ),
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="flex-1 max-w-44 px-4 flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-3">
              <img
                src="/img.jpg"
                alt={`Profile picture of `}
                aria-hidden="true"
                className="object-cover w-12 h-12 rounded-full border border-gray-300"
              />
              <div className="text-xs">
                <p>Avaz</p>
                <p>Azizov</p>
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
          {children}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
