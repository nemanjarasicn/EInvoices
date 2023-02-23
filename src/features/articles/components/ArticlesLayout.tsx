import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ArticlesLayout(): JSX.Element {
  return (
    <>
      <Outlet />
    </>
  );
}
