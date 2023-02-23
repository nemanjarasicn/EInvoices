import React from 'react';
import { GridPagination } from '@mui/x-data-grid';
import { IProps } from '../../../articles/models/articles.models';

type PaginationProps = {};

export default function TablePagination({
  props,
}: IProps<PaginationProps>): JSX.Element {
  return (
    // TODO PAGINATION AND PAGE SIZE
    <>
      <GridPagination></GridPagination>
    </>
  );
}
