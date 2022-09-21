import React from "react";
import { Outlet } from "react-router-dom";
import MenuAppBar from "./MenuAppBar";

type LayoutProps = {};

export default function Layout({}: LayoutProps) {
  return (
    <div>
      <MenuAppBar content={<Outlet />}></MenuAppBar>
    </div>
  );
}
