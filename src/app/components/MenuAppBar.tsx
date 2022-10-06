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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
import Payments from "@mui/icons-material/Payments";
import { useAppComponentsStyles } from "./components.styles";

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
  const { menuAppBarStyles } = useAppComponentsStyles();

  const navItems = [
    { name: t("Menu.home"), href: "/", icon: "Home" },
    { name: t("Menu.invoice"), href: "/invoices", icon: "Payments" },
  ];

  const icon = (icon: string): any => {
    switch (icon) {
      case "InboxIcon":
        return <InboxIcon />;
      case "MailIcon":
        return <MailIcon />;
      case "Home":
        return <Home />;
      case "Payments":
        return <Payments />;
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
      <AppBar position="fixed">
        <Toolbar style={menuAppBarStyles.toolbar}>
          <div style={menuAppBarStyles.logoDiv}>
            <Typography variant="h6" noWrap component="div">
              {"LOGO"}
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
        <DrawerHeader></DrawerHeader>
        <Divider />
        <IconButton
          onClick={handleDrawerClose}
          sx={menuAppBarStyles.styleFunction(open).chevronLeftIconButton}
        >
          <ChevronLeftIcon sx={{ float: "right" }} />
        </IconButton>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={menuAppBarStyles.styleFunction(open).menuIconButton}
        >
          <MenuIcon />
        </IconButton>
        <List>
          {navItems.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{ display: "block" }}
              component={Link}
              to={item.href}
              className="item-class"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#fff",
                    opacity: 0.5,
                  }}
                >
                  {icon(item.icon)}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    display: open ? "block" : "none",
                    color: "#fff",
                    opacity: 0.5,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1, paddingLeft: "90px" }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
