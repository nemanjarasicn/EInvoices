/**
 * Feature page styles
 * @returns {any}
 */
const usePageStyles = (): { dashBoardStyles: any } => {
  return {
    dashBoardStyles: {
      cardsWrapper: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        maxWidth: "66.667%",
      },
    },
  };
};

export { usePageStyles };
