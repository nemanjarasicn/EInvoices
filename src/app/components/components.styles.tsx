/**
 * App Components styles
 * @returns {}
 */
const useAppComponentsStyles = (): { menuAppBarStyles: any } => {
  const iconColor: string = "black";  //white

  return {
    menuAppBarStyles: {
      toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
      logoDiv: {
        display: "flex",
        alignItems: "inherit",
        color: "black"
      },
      langUserDiv: {
        display: "flex",
        justifyContent: "space-between",
      },
      styleFunction(open: boolean) {
        return {
          drawer: {
            backgroundColor: "white", //#24292e
            opacity: open ? 0.9 : 1,
            width: "150px",
            mt: 9
          },
          chevronLeftIconButton: {
            display: open ? "block" : "none",
            color: iconColor,
          },
          menuIconButton: {
            display: open ? "none" : "block",
            color: iconColor,
            margin: "0px",
          },
        };
      },
    },
  };
};

export { useAppComponentsStyles };
