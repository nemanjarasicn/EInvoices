import { CardProps } from "./InvoiceCardComponent";
import CodeIcon from "@mui/icons-material/Code";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useNavigate } from "react-router-dom";
import { TemplatePageTypes } from "../models/invoice.enums";
import { ButtonProps } from "./CustomButtonFc";

type FeatureSettings = {
  cardsSettings: CardProps[];
  templatePageSettings: {
    [key in TemplatePageTypes]: {
      title: string;
      showBtns: boolean;
      buttons: ButtonProps[];
    };
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
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/invoices/sales"),
        },
      },
      {
        title: "InvoiceCard.cardTitlePurchases",
        icon: CodeIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/invoices/purchases"),
        },
      },
      {
        title: "InvoiceCard.summaryVAT",
        icon: CloudSyncIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: true,
          btnFn: () => console.log("Zarko Trampic"),
        },
      },
    ],
    templatePageSettings: {
      [TemplatePageTypes.SALES]: {
        title: "InvoiceCard.cardTitleSales",
        showBtns: true,
        buttons: [
          {
            title: "ButtonsText.TemplatePage.createXML",
            disabled: true,
            btnFn: () => console.log("ZARE"),
          },
          {
            title: "ButtonsText.TemplatePage.createDocument",
            disabled: false,
            btnFn: () => console.log("ZARE"),
          },
        ],
      },
      [TemplatePageTypes.PURCHASES]: {
        title: "InvoiceCard.cardTitlePurchases",
        showBtns: false,
        buttons: [],
      },
    },
  };
};

export { useFeatureSettings };
