/**
 * Feature page styles
 * @returns {any}
 */
const usePageStyles = (): {
  dashBoardStyles: any;
  templatePageStyles: any;
} => {
  return {
    dashBoardStyles: {
      cardsWrapper: {
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "66.667%",
      },
    },
    templatePageStyles: {
      buttonsGrid: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      },
      tableWrapper: {
        padding: "10px",
        background: "rgba(0, 0, 0, 0.05)",
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px 0px",
        justifyItems: "end",
      },
    },
  };
};

export { usePageStyles };
