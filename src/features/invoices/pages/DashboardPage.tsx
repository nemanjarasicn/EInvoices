import React from "react";
import CardComponent, {
  CardProps,
} from "../../shared/components/CardComponent";
import { IProps } from "../models/invoice.models";
import { useFeatureSettings } from "../settings";
import { usePageStyles } from "./pages.styles";

type DashboardPageProps = {};

export default function DashboardPage({}: IProps<DashboardPageProps>): JSX.Element {
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();
  return (
    <div style={dashBoardStyles.cardsWrapper}>
      {cardsSettings.map((card: CardProps, index: number) => {
        return <CardComponent key={index} props={card} />;
      })}
    </div>
  );
}
