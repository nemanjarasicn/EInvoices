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
        height: '60px'
      },
      styleFunction(open: boolean) {
        return {
          drawer: {
            backgroundColor: "white", //#24292e
            opacity: open ? 0.9 : 1,
            width: window.devicePixelRatio == 1.5 ? '50px' : '68px',
            borderTopRightRadius:   '15px',
            borderBottomRightRadius:   '15px',
            height: window.devicePixelRatio == 1.5 ?  '500px':  '792px',
            mt:  window.devicePixelRatio == 1.5 ?  14 :  '144px'
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
