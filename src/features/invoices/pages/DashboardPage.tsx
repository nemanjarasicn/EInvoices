import React from "react";
import CardComponent, {
  CardProps,
} from "../../shared/components/CardComponent";
import { IProps } from "../models/invoice.models";
import { useFeatureSettings } from "../settings";
import Grid from "@mui/material/Grid";
import { usePageStyles } from "./pages.styles";

type DashboardPageProps = {};

export default function DashboardPage({}: IProps<DashboardPageProps>): JSX.Element {
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();

  const boxMarginTop   =    window.devicePixelRatio === 1.5 ?  3 :  10;
  return (
    
    <Grid container >

      <Grid item xs={4}  sx={{mt: boxMarginTop}}>
        <h3 style={{color:  'white'}}>E-FAKTURA</h3>
      </Grid>
        <div style={dashBoardStyles.cardsWrapper}>
        
              {cardsSettings.map((card: CardProps, index: number) => {
                return <CardComponent key={index} props={card} />;
              })}
            
        </div>
    </Grid>
  );
}
