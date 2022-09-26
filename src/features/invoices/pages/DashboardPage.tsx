import React from "react";
import InvoiceCardComponent, {
  CardProps,
} from "../components/InvoiceCardComponent";
import { useFeatureSettings } from "../components/settings";
import { usePageStyles } from "./pages.styles";

type InvoicePageProps = {};

export default function InvoicesPage({}: InvoicePageProps): JSX.Element {
  const { cardsSettings } = useFeatureSettings();
  const { dashBoardStyles } = usePageStyles();
  return (
    <div style={dashBoardStyles.cardsWrapper}>
      {cardsSettings.map((card: CardProps, index: number) => {
        return <InvoiceCardComponent key={index} {...card} />;
      })}
    </div>
  );
}
