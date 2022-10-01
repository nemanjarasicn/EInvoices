/**
 * Feature page styles
 * @returns {any}
 */
const usePageStyles = (): { dashBoardStyles: any; templatePageStyles: any } => {
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
    },
  };
};

export { usePageStyles };
