/**
 * Feature page styles
 * @returns {any}
 */
const usePageStyles = (): { dashBoardStyles: any } => {
  return {
    dashBoardStyles: {
      cardsWrapper: {
        display: "grid",
        gridTemplateColumns: '1fr 1fr 1fr'
      },
    },
  };
};

export { usePageStyles };
