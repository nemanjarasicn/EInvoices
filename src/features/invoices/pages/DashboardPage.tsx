import React from "react";
import InvoiceCardComponent, {
  CardProps,
} from "../components/InvoiceCardComponent";
import { IProps } from "../models/invoice.models";
import { useFeatureSettings } from "../settings";
import { usePageStyles } from "./pages.styles";

type DashboardPageProps = {};

export default function DashboardPage({}: IProps<DashboardPageProps>): JSX.Element {
  console.log("PROCES", process.env.REACT_APP_PUBLIC_API_URL);
  console.log("PROCES", process.env.NODE_ENV);
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();
  return (
    <div style={dashBoardStyles.cardsWrapper}>
      {cardsSettings.map((card: CardProps, index: number) => {
        return <InvoiceCardComponent key={index} props={card} />;
      })}
    </div>
  );
}
