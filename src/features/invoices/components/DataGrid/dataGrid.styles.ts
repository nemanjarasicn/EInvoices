/**
 * Data Grid styles
 * @returns {}
 */
const useDataGridStyles = (): { tableToolbar: any } => {
  return {
    tableToolbar: {
      container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        alignContent: "center",
        padding: "10px",
      },
    },
  };
};

export { useDataGridStyles };
