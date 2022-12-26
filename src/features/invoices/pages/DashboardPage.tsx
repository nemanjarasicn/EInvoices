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
  return (
    <div style={dashBoardStyles.cardsWrapper}>
      
        {/*<Item>*/}
          <h3 style={{color: 'grey'}}>E-FAKTURA</h3>
        {/*</Item>*/}
          
          {cardsSettings.map((card: CardProps, index: number) => {
            return <CardComponent key={index} props={card} />;
          })}
         
    </div>
  );
}
