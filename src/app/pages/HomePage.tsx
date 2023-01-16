import React from "react";
import CardComponent, {
  CardProps,
} from "../../features/shared/components/CardComponent";
import { IProps } from "../../features/invoices/models/invoice.models";
import { useTranslation } from "react-i18next";
import { useFeatureSettings } from "../../features/invoices/settings";
import Grid from "@mui/material/Grid";
import { usePageStyles } from "../../features/invoices/pages/pages.styles";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";


type HomePageProps = {
    IsFromHome?: boolean;
};

export default function HomePage({props}: IProps<HomePageProps>): JSX.Element {
  const { t } = useTranslation();
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();

  const boxMarginTop   =    window.devicePixelRatio === 1.5 ?  6 :  10;
  const fontSizeBreadcrumbs  =   window.devicePixelRatio === 1.5 ?  '16px' :  '20px';
  console.log('asssaasas', props);
  return (
    
    <Grid container >

      <Grid item xs={4}  sx={{mt: boxMarginTop, }}>
          <Breadcrumbs aria-label="breadcrumb"  sx={{'& .MuiBreadcrumbs-separator': {color: 'red'}}}>
                <Typography  sx={{color: 'white', fontSize:   fontSizeBreadcrumbs, fontFamily:  "Roboto",  lineHeight:  "32px",  fontWeight:  700}}>{t("Pocetna")}</Typography>
          </Breadcrumbs>
      </Grid>
      <Grid item  xs={8}   sx={{display:  'flex', alignItems:  'center', justifyContent:  'flex-end', mt: boxMarginTop}}   >
           
  </Grid>
        <div style={dashBoardStyles.cardsWrapper}>
        
              {cardsSettings.map((card: CardProps, index: number) => {
                return <CardComponent key={index} props={card} />;
              })}
            
        </div>
    </Grid>
  );
}
