/**
 * Feature Components styles
 * @returns {}
 */
const useComponentsStyles = (): { invoiceCardStyles: any } => {
  return {
    invoiceCardStyles: {
      card: {
        height: 235,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#eeeeee",
        opacity: "0.9",
        borderRadius: "7px",
        margin: "10px",
        "&:hover": {
          color: "gray",
          backgroundColor: "#dedede",
        },
      },
      cardContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        rowGap: "20px",
      },
    },
  };
};

export { useComponentsStyles };
