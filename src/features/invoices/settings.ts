import { CardProps } from "./components/InvoiceCardComponent";
import CodeIcon from "@mui/icons-material/Code";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useNavigate } from "react-router-dom";
import { TemplatePageTypes } from "./models/invoice.enums";
import { ButtonProps } from "./components/CustomButtonFc";
import { FilterComponentProps } from "./components/FilterComponent";
import { SelectAllAction } from "./components/SelectAllActionsComponent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadIcon from "@mui/icons-material/Download";

type FeatureSettings = {
  cardsSettings: CardProps[];
  templatePageSettings: {
    [key in TemplatePageTypes]: {
      title: string;
      showBtns: boolean;
      buttons: ButtonProps[];
      filters: FilterComponentProps[];
      actions: SelectAllAction[];
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
        filters: [
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.registeredInCIR",
            multiOption: true,
            type: "solo",
            filterItems: [],
          },
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.allDocumentTypes",
            multiOption: false,
            type: "multi",
            filterItems: [
              { index: 0, name: "InvoiceTypes.debitInvoice" },
              { index: 1, name: "InvoiceTypes.creditNote" },
              { index: 2, name: "InvoiceTypes.debitNote" },
              { index: 3, name: "InvoiceTypes.prepayment" },
            ],
          },
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.allStatuses",
            multiOption: false,
            type: "multi",
            filterItems: [
              { index: 0, name: "InvoiceStatuses.draft" },
              { index: 1, name: "InvoiceStatuses.sent" },
              { index: 2, name: "InvoiceStatuses.sending" },
              { index: 3, name: "InvoiceStatuses.cancelled" },
            ],
          },
        ],
        actions: [
          {
            actionIcon: DeleteForeverIcon,
            actionName: "Common.delete",
            actionFn: () => console.log("ACTION FN DELETE"),
          },
          {
            actionIcon: DownloadIcon,
            actionName: "Common.download",
            actionFn: () => console.log("ACTION FN DOWNLOAD"),
          },
        ],
      },
      [TemplatePageTypes.PURCHASES]: {
        title: "InvoiceCard.cardTitlePurchases",
        showBtns: false,
        buttons: [],
        filters: [],
        actions: [],
      },
    },
  };
};

export { useFeatureSettings };
