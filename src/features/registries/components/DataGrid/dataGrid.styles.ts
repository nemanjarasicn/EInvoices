/**
 * Data Grid styles
 * @returns {}
 */
const useDataGridStyles = (): {
  tableToolbar: any;
  tableComponentStyles: any;
} => {
  return {
    tableToolbar: {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignContent: 'center',
        padding: '10px',
      },
    },
    tableComponentStyles: {
      wrapper: {
        maxHeight: 800,
        width: '100%',
      },
      dataGrid: {
        // until MUI add prop disableSelectAllCheckbox
        '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer':
          {
            display: 'none',
          },

        '.MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '&.MuiDataGrid-root': {
          border: 'none',
        },
      },
    },
  };
};

export { useDataGridStyles };
