import React from "react";
import { Outlet } from "react-router-dom";
import MenuAppBar from "./MenuAppBar";

type LayoutProps = {};

export default function Layout({}: LayoutProps): JSX.Element {
  return (
    <div>
      <MenuAppBar content={<Outlet />}></MenuAppBar>
    </div>
  );
}
