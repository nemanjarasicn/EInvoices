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

type UserAccountProps = {};

export default function UserAccount({}: UserAccountProps): JSX.Element {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div style={{ margin: "10px" }} onClick={handleClick}>
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
                    marginTop: "10px",
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
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={t("UserAccount.logout")} />
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
