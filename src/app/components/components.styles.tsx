/**
 * App Components styles
 * @returns {}
 */
const useAppComponentsStyles = (): { menuAppBarStyles: any } => {
  const iconColor: string = "white";

  return {
    menuAppBarStyles: {
      toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
      logoDiv: {
        display: "flex",
        alignItems: "inherit",
      },
      langUserDiv: { 
        display: "flex", justifyContent: "space-between" 
      },
      styleFunction(open: boolean) {
        return {
          drawer: {
            backgroundColor: "#24292e",
          opacity: open ? 0.9 : 1,
          },
          chevronLeftIconButton: {
            display: open ? "block" : "none",
            color: iconColor,
          },
          menuIconButton: {
            display: open ? "none" : "block",
            color: iconColor,
          }
        }
      },
    },
  };
};

export { useAppComponentsStyles };
