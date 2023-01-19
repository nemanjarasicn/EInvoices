import React from "react";
import {
  Avatar,
  ClickAwayListener,
  Fade,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Popper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../hooks";
import { removeUser } from "../core/core.reducer";
import { setColor } from "../core/core.reducer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/pro-solid-svg-icons'

export default function UserAccount(): JSX.Element {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispach = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClickAway = () => {
    setAnchorEl(null);
  };

  //for  150 zoom
  const fontSizeText = window.devicePixelRatio == 1.5 ? '12px' : '18px';
  const marginLogout = window.devicePixelRatio == 1.5 ? '2px' : '10px';
  const marginAvatar = window.devicePixelRatio == 1.5 ? '2px' : '10px'; 

  /**
   * Handle Log out
   */
  const handleLogout = (): void => {
    dispach(removeUser({}));
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const setColor1 = (color: string) =>  {
    dispach(setColor(color));
  }

  const open = Boolean(anchorEl);
  return (
    <div style={{ margin:   marginAvatar }} onClick={handleClick}>
      <Avatar>
        <PersonIcon />
      </Avatar>
      <Popper open={open} anchorEl={anchorEl} placement={"bottom"} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={0}>
            <Paper>
              <ClickAwayListener onClickAway={handleClickAway}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "#24292e", 
                    marginTop:  marginLogout,
                    color: "white",
                    opacity: 0.9,
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader
                      component="div"
                      id="nested-list-subheader"
                    ></ListSubheader>
                  }
                >
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText 
                     primaryTypographyProps={{fontSize:  fontSizeText}} 
                    primary={t("UserAccount.logout")} />
                  </ListItemButton>

                  <ListItemButton sx={{ml: 4}}>
                    <ListItemIcon   onClick={() => setColor1('#ef3e56')}>
                        <FontAwesomeIcon icon={faCircle}   size="2x"   color="#ef3e56" />
                    </ListItemIcon>
                    <ListItemIcon  onClick={() => setColor1('#72AD11')}>
                        <FontAwesomeIcon icon={faCircle}  size="2x"  color="#72AD11" />
                    </ListItemIcon>
                  </ListItemButton>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
