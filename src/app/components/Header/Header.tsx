"use client";

import { FC } from "react";
import {
  DownOutlined,
  EditOutlined,
  LoginOutlined,
  LogoutOutlined,
  PlusSquareOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
const items: MenuProps["items"] = [
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/add/newReport">
        <PlusSquareOutlined rev={undefined} /> Add a report on map
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/users/new">
        <PlusSquareOutlined rev={undefined} /> Add New Item
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/role/edit/vineyard">
        <EditOutlined rev={undefined} /> Edit Vineyard
      </a>
    ),
    key: "2",
  },
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/role/edit/area">
        <EditOutlined rev={undefined} /> Edit Area
      </a>
    ),
    key: "3",
  },

  {
    type: "divider",
  },

  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/users/areas">
        <UnorderedListOutlined rev={undefined} /> List Areas
      </a>
    ),
    key: "4",
  },
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/role/list/vineyard">
        <UnorderedListOutlined rev={undefined} /> List Vineyards
      </a>
    ),
    key: "5",
  },
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/users/listReports">
        <UnorderedListOutlined rev={undefined} /> List Reports
      </a>
    ),
    key: "6",
  },

  {
    type: "divider",
  },
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/users/login">
        <LoginOutlined rev={undefined} /> Log In
      </a>
    ),
    key: "7",
  },

  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/users/logout">
        <LogoutOutlined rev={undefined} /> Log Out
      </a>
    ),
    key: "8",
  },
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/users/signup">
        <UserAddOutlined rev={undefined} /> Sign Up
      </a>
    ),
    key: "9",
  },
  {
    label: (
      <a target="_self" rel="noopener noreferrer" href="/users/info">
        <SettingOutlined rev={undefined} /> User Setting
      </a>
    ),
    key: "10",
  },
];
export const Header: FC = () => {
  // const currentUser = localStorage.getItem("currentUser");
  return (
    <>
      <div
        className="tw-fixed md:tw-px-6 tw-grid tw-grid-cols-2 tw-place-content-between tw-z-50 tw-w-full  
        tw-bg-gradient-to-r tw-from-violet-300 tw-via-purple-300 tw-to-violet-50 tw-backdrop-blur-sm tw-shadow-md tw-p-6 "
      >
        <div className="tw-grid tw-content-center">
          <a href="/" target="_self" className="tw-no-underline tw-text-5xl tw-font-bold">
            🍇 Vita Del Vino
          </a>
        </div>
        <div className="tw-grid tw-content-center tw-place-items-end tw-pr-12">
          <Dropdown
            overlayClassName="tw-bg-red tw-rounded-md tw-shadow-md tw-border tw-border-gray-200"
            menu={{ items }}
          >
            <a
              id="button"
              className="tw-cursor-pointer tw-flex tw-items-center tw-space-x-2 tw-py-2 tw-px-3 tw-bg-customPurple tw-rounded-md tw-shadow-md tw-border tw-border-gray-200"
            >
              <Space>
                <UserOutlined rev={undefined} />
                {/* {currentUser} */}
                <DownOutlined rev={undefined} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
