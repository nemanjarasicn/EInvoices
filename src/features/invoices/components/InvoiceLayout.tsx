import React from 'react';
import { Outlet } from 'react-router-dom';

type InvoiceLayoutProps = {};

// eslint-disable-next-line no-empty-pattern
export default function InvoiceLayout({}: InvoiceLayoutProps): JSX.Element {
  return (
    <>
      <Outlet />
    </>
  );
}
