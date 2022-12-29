import React from "react";
import CardComponent, {
  CardProps,
} from "../../shared/components/CardComponent";
import { IProps } from "../models/invoice.models";
import { useTranslation } from "react-i18next";
import { useFeatureSettings } from "../settings";
import Grid from "@mui/material/Grid";
import { usePageStyles } from "./pages.styles";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


type DashboardPageProps = {};

export default function DashboardPage({}: IProps<DashboardPageProps>): JSX.Element {
  const { t } = useTranslation();
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();

  const boxMarginTop   =    window.devicePixelRatio === 1.5 ?  6 :  10;
  const fontSizeBreadcrumbs  =   window.devicePixelRatio === 1.5 ?  '16px' :  '20px';
  return (
    
    <Grid container >

      <Grid item xs={12}  sx={{mt: boxMarginTop}}>
          <Breadcrumbs aria-label="breadcrumb"  sx={{'& .MuiBreadcrumbs-separator': {color: 'red'}}}>
                <Typography  sx={{color: 'white', fontSize:   fontSizeBreadcrumbs, fontFamily:  "Roboto",  lineHeight:  "32px",  fontWeight:  700}}>{t("Menu.invoice")}</Typography>
          </Breadcrumbs>
      </Grid>
        <div style={dashBoardStyles.cardsWrapper}>
        
              {cardsSettings.map((card: CardProps, index: number) => {
                return <CardComponent key={index} props={card} />;
              })}
            
        </div>
    </Grid>
  );
}
