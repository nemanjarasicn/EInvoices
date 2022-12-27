import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Divider from '@mui/material/Divider';
import CompaniesSelector from "./CompaniesSelector";
import LanguageSelector from "./LanguageSelector";
import UserAccount from "./UserAccount";
import Home from "@mui/icons-material/Home";
import ArticleIcon from '@mui/icons-material/Article';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Payments from "@mui/icons-material/Payments";
import { useAppComponentsStyles } from "./components.styles";
import LogoutIcon from "@mui/icons-material/Logout";
import ErrorModal from "../../features/shared/components/ErrorModals";
import { useTheme } from '@mui/material/styles';
import AppLoader from "./AppLoader";
import { NavItem } from "../models/navItem.models";
import { useAppSelector } from "../hooks";
import  {  selectCompany  }  from "../core/core.selectors"
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { removeUser } from "../core/core.reducer";

const drawerWidth =  200;

/*const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));*/

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: '90%'
}));

export default function ClippedDrawer() {
  const dispach = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme  =  useTheme();
  const { menuAppBarStyles } = useAppComponentsStyles();
  const companyUser = useAppSelector(selectCompany) as any;

  const [calcNumber, setCalcNumber] =  React.useState<number>(1);
  const [showSubMenu,  setShowSubMenu] =  React.useState<boolean>(false);
  const [parentItem, setParentItem] =  React.useState<any>();
  const stepPosition = window.devicePixelRatio === 1.5 ?  50  : 80;
  const sizeIcons = window.devicePixelRatio === 1.5 ? '30px' : '50px'; 
  const logoSize = window.devicePixelRatio === 1.5 ?  100 : 150; 
  const paddingLeftMain = window.devicePixelRatio === 1.5 ? '100px' : '160px';
  const leftSubmenu = window.devicePixelRatio === 1.5 ? '60px' : '140px'; 
  const startPositionSubmenu = window.devicePixelRatio === 1.5 ? '230px' : '345px'; 
  const subMenuWidth = window.devicePixelRatio === 1.5 ? 180 : 259 ; 
  const subMenuHeight = window.devicePixelRatio === 1.5 ? 210 : 350 ; 
  const subMenuPadding = window.devicePixelRatio === 1.5 ?  0 :   2; 
  const fontSizeText = window.devicePixelRatio === 1.5 ? '12px' : '18px';
  const appBarHeight = window.devicePixelRatio === 1.5 ? '40px' : '65px'; 
  const logoutIconMarginTop    =     window.devicePixelRatio === 1.5 ? '190px' : '270px'; 
  const gradiantSize = window.devicePixelRatio === 1.5 ?   '20%' : '15%';
  const minWidthIcon    =    window.devicePixelRatio === 1.5 ?  20 :  80; 

  const navItems: NavItem[] = [
    { name: t("Menu.home"), href: "/", icon: "Home",submenu: false, },
    {
      name: t("Menu.invoice"),
      href: "/invoices",
      icon: "Payments",
      listNumber: 1,
      submenu: true,
      children: [
        {
          name: t("InvoiceCard.cardTitleSales"),
          href: "/invoices/sales",
          icon: "Payments",
        },
        {
          name: t("InvoiceCard.cardTitlePurchases"),
          href: "/invoices/purchases",
          icon: "Payments",
        },
        {
          name: t("ButtonsText.TemplatePage.createDocument"),
          href: "/invoices/create",
          icon: "Payments",
        },
        {
          name: t("ButtonsText.TemplatePage.createXML"),
          href: "/invoices/create-xml",
          icon: "Payments",
        },
      ],
    },
    {
      name: t("Menu.registries"),
      href: "/articles",
      icon: "Articles",
      listNumber: 2,
      submenu: true,
      children: [
        {
          name:  t("Articles.title"),
          href: "/articles/articlesList",
          icon: "Payments",
        },
      ],
    },
    {
      name: t("Menu.administration"),
      href: "/registries",
      icon: "ApartmentIcon",
      listNumber:  3,
      submenu: true,
      children: [
        {
          name: t("Objects.title"),
          href: "/registries/objects",
          icon: "Home",
        },
        {
          name: t("MarketPlace.title"),
          href: "/registries/marketPlace",
          icon: "Home",
        },
        {
          name: t("PointOfSale.title"),
          href: "/registries/pointOfSale",
          icon: "Home",
        },
        {
          name: t("Companies.title"),
          href: "/registries/companies",
          icon: "Home",
        },
        {
          name: t("Warehouses.title"),
          href: "/registries/warehouse",
          icon: "Home",
        },
      ],
    },
    
  ];

  const icon = (icon: string): any => {
    switch (icon) {
      case "InboxIcon":
        return <InboxIcon sx={{fontSize:  sizeIcons}} />;
      case "MailIcon":
        return <MailIcon sx={{fontSize:  sizeIcons}} />;
      case "Home":
        return <Home sx={{fontSize:  sizeIcons}} />;
      case "Payments":
        return <Payments sx={{fontSize:  sizeIcons}} />;
      case "Articles":
          return <ArticleIcon sx={{fontSize:  sizeIcons}} />;

      case "Logout":
            return <LogoutIcon style={{ fontSize:  sizeIcons }} />;
      case "ApartmentIcon":
          return <ApartmentIcon sx={{fontSize:  sizeIcons}} />;
    }
  };

  const [open, setOpen] = React.useState(false);

  /*const handleDrawerOpen = () => {
    setOpen(true);
  };*/

  const handleDrawerClose = () => {
    setOpen(false);
  };



  /**
   * Handle Log out
   */
   const handleLogout = (): void => {
    dispach(removeUser({}));
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  

  return (
    <Box sx={{ display: "flex"  }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0} sx={{ backgroundColor:  "#323b40",  height:  appBarHeight, mr: 6, mt: 1}}>
        <Toolbar style={menuAppBarStyles.toolbar}>
          <div style={menuAppBarStyles.logoDiv}>
            <Typography variant="h6" noWrap component="div">
              <img src="/logoMaster.png" alt="Master logo" style={{maxWidth: logoSize}}  />
            </Typography>
          </div>
          <div style={menuAppBarStyles.langUserDiv}>
          {companyUser.length > 1 && 
          <CompaniesSelector /> 
           }
            <LanguageSelector />
            {/*<UserAccount />*/}
          </div>
        </Toolbar>
        <Divider   sx={{width: '97%', ml: 2,  backgroundColor:  'white'}}/>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: menuAppBarStyles.styleFunction(open).drawer,
          onMouseLeave: handleDrawerClose,
        }}
      >
        
       
        {/* <IconButton
          onClick={handleDrawerClose}
          sx={menuAppBarStyles.styleFunction(open).chevronLeftIconButton}
        >
          <ChevronLeftIcon sx={{ float: "right" }} />
        </IconButton> */}
        {/*<IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={menuAppBarStyles.styleFunction(open).menuIconButton}
        >
          <MenuIcon />
      </IconButton>*/}

        <List key={"list_nav"}>

          {navItems.map((item, index) => {
            return (
              <div key={index}>
                <ListItem
                  key={`${item.name}_list_nav_${index}`}
                  disablePadding
                  sx={{ display: "block" }}
                  component={Link}
                  to={item.href}
                  className="item-class"
                >
                  <ListItemButton
                    key={`${item.name}_list_nav_button_${index}`}
                    sx={{
                      minHeight:  minWidthIcon, //48
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      display:  'flex',
                      flexDirection:  'column'
                    }}
                    onMouseEnter={(e)  => {setCalcNumber(item.listNumber as number); setShowSubMenu(item.submenu as boolean); setParentItem(item as any)}}
                    onMouseLeave={()  =>  setShowSubMenu(false)}
                    onClick={()  =>  setShowSubMenu(false)}
                  >
                    <ListItemIcon
                      key={`${item.name}_list_nav_icon${index}`}
                      sx={{
                        minWidth: 0,
                        display: 'block',
                        color: "black", //  #fff
                        opacity: 0.5,
                      }}
                      
                    >
                      {icon(item.icon)}
                    </ListItemIcon>
                    {/*<ListItemText
                      key={`${item.name}_list_nav_text${index}`}
                      primaryTypographyProps={{fontSize:  fontSizeText, fontWeight: 500}} 
                      primary={item.name}
                      sx={{
                        display:  "block" ,
                        color: theme.palette.secondary.main, // fff
                        opacity: 0.9,
                      }}
                    />*/}
                  </ListItemButton>
                </ListItem>
                <Box sx={{position: 'fixed',
                          transform: 'translate(-50%, -50%)',
                          width:  subMenuWidth , 
                          height:  subMenuHeight ,
                          top: `calc(${startPositionSubmenu} + ${calcNumber}*${stepPosition}px)`,
                          left: `${leftSubmenu}`,
        
                          borderRadius: 2,
                          p:  subMenuPadding,
                          backgroundColor:  'white',
                          ml: 10,
                          zIndex: 1,
                          display:  showSubMenu ?  'flex'  :  'none'
                      }}
                      onMouseEnter = {()   =>  setShowSubMenu(true)}
                      onMouseLeave = {()  =>   setShowSubMenu(false)}> 
               
                  <List key={`list_subnav`}>
                  {navItems.filter((item) =>  item?.name  ===  parentItem?.name)[0]?.children?.map((itemChild, childIndex) => (
                     <ListItem disablePadding
                               component={Link}
                               to={itemChild.href}>
                          <ListItemButton>
                          <ListItemText   primaryTypographyProps={{fontSize:  fontSizeText,   fontWeight:   500}} 
                                          primary={itemChild.name} 
                                          sx={{
                                            display:  "block" ,
                                            color: "black", // fff
                                            opacity: 0.9,
                                          }}/>
                          </ListItemButton>
                   </ListItem>

                  ))}
                </List>
                </Box>
                {/*<List key={`list_nav_${index}`}>
                  {item.children?.map((itemChild, childIndex) => (
                    <ListItem
                      key={`${itemChild.name}_list_nav_${childIndex}`}
                      disablePadding
                      sx={{ display:  "block"  }}
                      component={Link}
                      to={itemChild.href}
                      className="item-class"
                    >
                      <ListItemButton
                        key={`${itemChild.name}_list_nav_child_button${childIndex}`}
                        sx={{
                          minHeight: 48,
                          justifyContent: "initial" ,
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          key={`${itemChild.name}_list_nav_child_icon${childIndex}`}
                          sx={{
                            minWidth: 0,
                            mr: 1,
                            justifyContent: "center",
                            color: "green",
                            opacity: 0,
                          }}
                        >
                          {icon(itemChild.icon)}
                        </ListItemIcon>
                        <ListItemText
                          key={`${itemChild.name}_list_nav_child_text${childIndex}`}
                          primary={itemChild.name}
                          sx={{
                            display: "block",
                            color: "green",
                            opacity: 0.5,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                        </List>*/}
              </div>
            );
          })}


          <div key={'logout'}  style={{marginTop:    logoutIconMarginTop}}>
                <ListItem
                  key={`logaout`}
                  disablePadding
                  sx={{ display: "block" }}
                  className="item-class"
                >
                  <ListItemButton
                    key={`logaout`}
                    sx={{
                      minHeight: 80, //48
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      display:  'flex',
                      flexDirection:  'column'
                    }}
                    onClick={()  =>  handleLogout()}
                  >
                    <ListItemIcon
                      key={'logout_icon'}
                      sx={{
                        minWidth: 0,
                        display: 'block',
                        color: "black", //  #fff
                        opacity: 0.5,
                      }}
                      
                    >
                      <LogoutIcon style={{ fontSize:  sizeIcons }} />
                    </ListItemIcon>
                    {/*<ListItemText
                      key={`${item.name}_list_nav_text${index}`}
                      primaryTypographyProps={{fontSize:  fontSizeText, fontWeight: 500}} 
                      primary={item.name}
                      sx={{
                        display:  "block" ,
                        color: theme.palette.secondary.main, // fff
                        opacity: 0.9,
                      }}
                    />*/}
                  </ListItemButton>
                </ListItem>
        </div>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingLeft:  paddingLeftMain, paddingRight: "90px", background:  `linear-gradient(180deg, #323b40  ${gradiantSize} , #f3f3f4 0%)`, height: '190vh' }}
      >
        <Toolbar />
        <AppLoader />
        <Outlet />
      </Box>
    </Box>
  );
}
