import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

type ArticlesLayoutProps = {};

export default function ArticlesLayout({}: ArticlesLayoutProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      {/*<Grid item xs={4} mb={2} mt={2}>
          <Item>
            <h3>{t("Menu.articles")}</h3>
          </Item>
      </Grid>*/}
      <Outlet />
    </>
  );
}
