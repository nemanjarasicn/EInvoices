import { CardProps } from "./InvoiceCardComponent";
import CodeIcon from "@mui/icons-material/Code";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useNavigate } from "react-router-dom";
import { TemplatePageTypes } from "../models/invoice.enums";

type FeatureSettings = {
  cardsSettings: CardProps[];
  templatePageSettings: {
    [key in TemplatePageTypes]: { title: string; showBtns: boolean };
  };
};
/**
 * hook predefine settings
 * @returns {FeatureSettings}
 */
const useFeatureSettings = (): FeatureSettings => {
  let navigate = useNavigate();
  return {
    cardsSettings: [
      {
        title: "InvoiceCard.cardTitleSales",
        icon: ExitToAppIcon,
        cardFn: () => navigate("/invoices/sales"),
        cardBtnTitle: "InvoiceCard.preview",
      },
      {
        title: "InvoiceCard.cardTitlePurchases",
        icon: CodeIcon,
        cardFn: () => navigate("/invoices/purchases"),
        cardBtnTitle: "InvoiceCard.preview",
      },
      {
        title: "InvoiceCard.summaryVAT",
        icon: CloudSyncIcon,
        cardFn: () => console.log("Zarko Trampic"),
        cardBtnTitle: "InvoiceCard.preview",
      },
    ],
    templatePageSettings: {
      [TemplatePageTypes.SALES]: {
        title: "InvoiceCard.cardTitleSales",
        showBtns: true,
      },
      [TemplatePageTypes.PURCHASES]: {
        title: "InvoiceCard.cardTitlePurchases",
        showBtns: false,
      },
    },
  };
};

export { useFeatureSettings };
