/**
 * Feature Components styles
 * @returns {}
 */
const useComponentsStyles = (): {
  invoiceCardStyles: any;
  filersToolbarStyles: any;
  filterComponentStyle: any;
  selectAllConmponentStyles: any;
} => {
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
    filersToolbarStyles: {
      wrapper: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      },
      basicFilters: {
        display: "grid",
        justifyContent: "flex-end",
        padding: "10px",
        columnGap: "15px",
        background: "rgba(0, 0, 0, 0.05)",
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px",
        justifyItems: "end",
        width: "210px",
        rowGap: "5px",
        border: `thin solid rgb(221 221 221)`,
      },
      selectAllActions: {
        display: "grid",
        padding: "10px 10px 10px 0",
        columnGap: "15px",
        // background: "rgba(0, 0, 0, 0.05)",
        // boxShadow:
        // "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px",
        justifyItems: "end",
        width: "70px",
        rowGap: "5px",
        // border: `thin solid rgb(221 221 221)`,
      },
    },
    filterComponentStyle: {
      wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        columnGap: "15px",
        background: "white",
        borderRadius: "30px",
        border: `thin solid rgb(221 221 221)`,
      },
      checkedFilters: {
        display: "flex",
        columnGap: "5px",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        minWidth: "max-content",
        alignItems: "center",
        marginLeft: "15px",
      },
      checkedFiltersInner: {
        display: "flex",
        alignItems: "center",
        "&:hover": {
          color: "blue !important",
        },
      },
      buttonStyles: {
        borderRadius: "20px",
        whiteSpace: "nowrap",
        minWidth: "max-content",
        textTransform: "none",
        borderLeft: `thin solid rgb(221 221 221)`,
        width: "190px",
      },
      paperList: {
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      },
      iconButtonStyles: {
        display: "flex",
        alignItems: "center",
        columnGap: "5px",
      },
      soloFilterInner: {
        marginLeft: "15px",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
      },
    },
    selectAllConmponentStyles: {
      buttonStyles: {
        borderRadius: "20px",
        whiteSpace: "nowrap",
        minWidth: "max-content",
        textTransform: "none",
        borderRight: `thin solid rgb(221 221 221)`,
        width: "60px",
        height: "38px",
      },
      soloSelectAll: {
        marginRight: "15px",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        marginLeft: "10px",
      },
      checkbox: { padding: 0, margin: 0 },
    },
  };
};

export { useComponentsStyles };
