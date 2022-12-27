import React from "react";
import CardComponent, {
  CardProps,
} from "../../shared/components/CardComponent";
import { IProps } from "../models/registries.models";
import { useFeatureSettings } from "../settings";
import { usePageStyles } from "./pages.styles";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

type DashboardPageProps = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));

export default function DashboardPage({}: IProps<DashboardPageProps>): JSX.Element {
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();

  
  const  marginTopBox  =     window.devicePixelRatio === 1.5 ?  4 :  10;
  return (
    <Box sx={{ flexGrow: 1 ,  mt:   marginTopBox}}>
      <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'column', ml: 1}}>
          
        <h3 style={{color:  'white'}}>ADMINISTRACIJA</h3>
          

        <div style={dashBoardStyles.cardsWrapper}>
          {cardsSettings.filter((card)  => card.typeOfCard  ===   "company").map((card: CardProps, index: number) => {
            return <CardComponent key={index} props={card} />;
          })}
        </div>
        {/*<Grid item xs={4}>
          <Item>
            <h3>Za Artikle</h3>
          </Item>
        </Grid>*/}
        <div style={dashBoardStyles.cardsWrapper}>
          {cardsSettings.filter((card)  => card.typeOfCard  ===   "articles").map((card: CardProps, index: number) => {
            return <CardComponent key={index} props={card} />;
          })}
        </div>
      </Grid>
    </Box>
  );
}
