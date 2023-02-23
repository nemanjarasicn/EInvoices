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
        width: '100%',
        backgroundColor: 'green',
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

        '& .MuiDataGrid-columnHeader': {
          color: 'black',

          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '16px',
        },
      },
    },
  };
};

export { useDataGridStyles };
