import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
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
import LanguageSelector from "./LanguageSelector";
import UserAccount from "./UserAccount";
import Home from "@mui/icons-material/Home";
import ArticleIcon from '@mui/icons-material/Article';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Payments from "@mui/icons-material/Payments";
import { useAppComponentsStyles } from "./components.styles";
import { useTheme } from '@mui/material/styles';
import AppLoader from "./AppLoader";
import { NavItem } from "../models/navItem.models";
import NestedMenuItem  from   "@lazy-react/material-ui-nested-menu-item"

const drawerWidth = 200;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function ClippedDrawer() {
  const { t } = useTranslation();
  const theme  =  useTheme();
  const { menuAppBarStyles } = useAppComponentsStyles();

  const [calcNumber, setCalcNumber] =  React.useState<number>(1);
  const [showSubMenu,  setShowSubMenu] =  React.useState<boolean>(false);
  const [parentItem, setParentItem] =  React.useState<any>();
  const stepPosition = 140;

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
      name: t("Menu.articles"),
      href: "/articles",
      icon: "Articles",
      listNumber: 2,
      submenu: true,
      children: [
        {
          name:  t("Artikli lista"),
          href: "/articles/articlesList",
          icon: "Payments",
        },
      ],
    },
    {
      name: t("Menu.registries"),
      href: "/registries",
      icon: "ApartmentIcon",
      listNumber:  3,
      submenu: true,
      children: [
        {
          name: t("Objekti"),
          href: "/registries/objects",
          icon: "Home",
        },
        {
          name: t("Prodajna mesta"),
          href: "/registries/marketPlace",
          icon: "Home",
        },
        {
          name: t("Kase"),
          href: "/registries/pointOfSale",
          icon: "Home",
        },
        {
          name: t("Kompanije"),
          href: "/registries/companies",
          icon: "Home",
        },
        {
          name: t("Magacini"),
          href: "/registries/warehouse",
          icon: "Home",
        },
      ],
    },
  ];

  const icon = (icon: string): any => {
    switch (icon) {
      case "InboxIcon":
        return <InboxIcon sx={{fontSize:  '80px'}} />;
      case "MailIcon":
        return <MailIcon sx={{fontSize:  '80px'}} />;
      case "Home":
        return <Home sx={{fontSize:  '80px'}} />;
      case "Payments":
        return <Payments sx={{fontSize:  '80px'}} />;
      case "Articles":
          return <ArticleIcon sx={{fontSize:  '80px'}} />;
      case "ApartmentIcon":
          return <ApartmentIcon sx={{fontSize:  '80px'}} />;
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{backgroundColor: "white"}}>
        <Toolbar style={menuAppBarStyles.toolbar}>
          <div style={menuAppBarStyles.logoDiv}>
            <Typography variant="h6" noWrap component="div">
              <img src="/logoMaster.png" alt="Master logo" style={{maxWidth:150}}  />
            </Typography>
          </div>
          <div style={menuAppBarStyles.langUserDiv}>
            
            <LanguageSelector />
            <UserAccount />
          </div>
        </Toolbar>
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
                      minHeight: 80, //48
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
                    <ListItemText
                      key={`${item.name}_list_nav_text${index}`}
                      primary={item.name}
                      sx={{
                        display:  "block" ,
                        color: theme.palette.secondary.main, // fff
                        opacity: 0.9,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <Box sx={{position: 'fixed',
                          transform: 'translate(-50%, -50%)',
                          width:  350 , 
                          height: 350 ,
                          top: `calc(260px + ${calcNumber}*${stepPosition}px)`,
                          left: '245px',
        
                          borderRadius: 2,
                          p: 2,
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
                          <ListItemText primary={itemChild.name} 
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
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingLeft: "160px", paddingRight: "20px", backgroundColor:  "#EAEDED", height: '100vh' }}
      >
        <Toolbar />
        <AppLoader />
        <Outlet />
      </Box>
    </Box>
  );
}
