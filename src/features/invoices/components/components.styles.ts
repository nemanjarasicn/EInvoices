/**
 * Feature Components styles
 * @returns {}
 */
const useComponentsStyles = (): {
  invoiceCardStyles: any;
  filersToolbarStyles: any;
  filterComponentStyle: any;
  selectAllConmponentStyles: any;
  dropzoneComponent: any;
  formComponent: any;
  searchField: any;
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
    dropzoneComponent: {
      container: {
        maxHeight: "50px",
        paddingTop: "8px",
        marginBottom: "8px",
        paddingLeft: "16px",
      },
      title: {
        background: "rgba(0, 0, 0, 0.05)",
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px",
        /* justify-items: end, */
        marginBottom: "15px",
        height: " 40px",
        display: "flex",
        alignItems: "center",
        width: "400px",
        padding: "10px",
        justifyContent: "space-evenly",
      },
      wrapDivider: { margin: "auto", padding: "16px 0px 0px 16px" },
      divider: {
        height: " 40px",
        background: "rgba(0, 0, 0, 0.05)",
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px",
      },
      rejectedContainer: {},
      errorText: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "red",
      },
      bold: {
        fontWeight: "bold",
        fontSize: "0.9rem",
      },
      centredBadgeButton: {
        wrapper: {
          display: "flex",
          justifyContent: "center",
          height: 0,
        },
        button: {
          position: "relative",
          top: "-25px",
        },
      },
      errorCard: {
        wrapper: {
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 128,
            height: 128,
          },
        },
        card: {
          width: "100%",
          height: "auto",
          display: "grid",
          /* justify-items: center, */
          /* align-items: center, */
          padding: "15px",
          rowGap: "10px",
          margin: 0,
        },
      },
      rejectedFiles: {
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: "185px",
      },
    },
    formComponent: {
      basicBox: {
        p: 1,
        bgcolor: (theme: { palette: { mode: string } }) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme: { palette: { mode: string } }) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme: { palette: { mode: string } }) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
      },
      typography: { fontWeight: 600, p: 0.5, fontSize: "0.9rem" },
      paper: {
        p: 2,
        background: "white",
      },
      groupPaper: {
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        background: "white",
      },
    },
    searchField: {
      searchFieldDiv: {
        textAlign: "center", 
        margin: "10px 10px 10px -10px", 
      },
      searchFieldControl: {
        m: 1,
        width: "100%",
        borderColor: "#dedede",
        borderBlockColor: "#dedede",
        borderWidth: 0,
      },
      outlinedInput: {
        borderRadius : "8px"
      },
      endAdornment: {
         fontSize: "12px", 
         color: "#dedede" 
      },
      checkboxColor: {
        color: "#dedede",
      },
      iconButtonColor: {
        color: "#787993",
      }
    }
  };
};

export { useComponentsStyles };
