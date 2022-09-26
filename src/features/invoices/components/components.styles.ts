/**
 * Feature Components styles
 * @returns {}
 */
const useComponentsStyles = (): { invoiceCardStyles: any } => {
  return {
    invoiceCardStyles: {
      card: {
        width: 275,
        height: 235,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#eeeeee",
        opacity: "0.9",
        borderRadius: "30px",
        boxShadow: "0px 0px 10px 6px rgb(0 0 0 / 40%)",
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
