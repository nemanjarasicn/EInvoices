import { CardProps } from "./InvoiceCardComponent";
import CodeIcon from "@mui/icons-material/Code";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloudSyncIcon from "@mui/icons-material/CloudSync";

type FeatureSettings = {
  cardsSettings: CardProps[];
};
/**
 * hook predefine settings
 * @returns {FeatureSettings}
 */
const useFeatureSettings = (): FeatureSettings => {
  return {
    cardsSettings: [
      {
        title: "InvoiceCard.cardTitleSales",
        icon: ExitToAppIcon,
        cardFn: () => console.log("Zarko Trampic"),
        cardBtnTitle: "InvoiceCard.preview",
      },
      {
        title: "InvoiceCard.cardTitlePurchases",
        icon: CodeIcon,
        cardFn: () => console.log("Zarko Trampic"),
        cardBtnTitle: "InvoiceCard.preview",
      },
      {
        title: "InvoiceCard.summaryVAT",
        icon: CloudSyncIcon,
        cardFn: () => console.log("Zarko Trampic"),
        cardBtnTitle: "InvoiceCard.preview",
      },
    ],
  };
};

export { useFeatureSettings };
