/**
 * App Components styles
 * @returns {}
 */
const useAppComponentsStyles = (): { menuAppBarStyles: any } => {
  const iconColor: string = "black";  //white

  /* this is for 150 zoom */
  const stepPosition = window.devicePixelRatio === 1.5 ?  50  : 80;
  const sizeIcons = window.devicePixelRatio === 1.5 ? '30px' : '40px'; 
  const logoSize = window.devicePixelRatio === 1.5 ?  100 : 150; 
  const paddingLeftMain = window.devicePixelRatio === 1.5 ? '100px' : '160px';
  const leftSubmenu = window.devicePixelRatio === 1.5 ? '60px' : '118px'; 
  const startPositionSubmenu = window.devicePixelRatio === 1.5 ? '230px' : '335px'; 
  const subMenuWidth = window.devicePixelRatio === 1.5 ? 180 : 259 ; 
  const subMenuHeight = window.devicePixelRatio === 1.5 ? 210 : 350 ; 
  const subMenuPadding = window.devicePixelRatio === 1.5 ?  0 :   2; 
  const fontSizeText = window.devicePixelRatio === 1.5 ? '12px' : '18px';
  const appBarHeight = window.devicePixelRatio === 1.5 ? '40px' : '65px'; 
  const logoutIconMarginTop    =     window.devicePixelRatio === 1.5 ? '190px' : '370px'; 
  const gradiantSize = window.devicePixelRatio === 1.5 ?   '20%' : '15%';
  const minWidthIcon    =    window.devicePixelRatio === 1.5 ?  20 :  80; 

  return {
    menuAppBarStyles: {
      root: {
        backgroundColor:  "#323b40",  
        height:  appBarHeight, 
        mr: 6, 
        mt: 1, 
        top: 0
      },
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
      divider:   {
            width: '97%', 
            ml: 2,  
            backgroundColor:  '#8E999F'
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
