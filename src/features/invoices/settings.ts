import { CardProps } from "./components/InvoiceCardComponent";
import CodeIcon from "@mui/icons-material/Code";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useNavigate } from "react-router-dom";
import { CreateType, TemplatePageTypes } from "./models/invoice.enums";
import { ButtonProps } from "./components/CustomButtonFc";
import { FilterComponentProps } from "./components/FilterComponent";
import { SelectAllAction } from "./components/SelectAllActionsComponent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadIcon from "@mui/icons-material/Download";
import HistoryIcon from "@mui/icons-material/History";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import { InvoiceDropzoneProps } from "./components/InvoiceDropzoneComponent";
import { InvoiceFormComponentProps } from "./components/InvoiceFormComponent";
import { InvoiceType } from "./models";
import { useAppDispatch } from "../../app/hooks";

type FeatureSettings = {
  cardsSettings: CardProps[];
  templatePageSettings: {
    [key in TemplatePageTypes]: {
      title: string;
      showBtns: boolean;
      buttons: ButtonProps[];
      filters: FilterComponentProps[];
      actions: SelectAllAction[];
      showTable: boolean;
      showFilterBox?:  boolean
    };
  };
  salesTemplatePageSettings: {
    [key in CreateType]: InvoiceDropzoneProps | InvoiceFormComponentProps;
  };
};
/**
 * hook predefine settings
 * @returns {FeatureSettings}
 */
const useFeatureSettings = (): FeatureSettings => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        typeOfCard:  "invoices",
        description: "MenuDescription.invoiceSales",
      },
      {
        title: "InvoiceCard.cardTitlePurchases",
        icon: CodeIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/invoices/purchases"),
        },
        typeOfCard:  "invoices",
        description:  "MenuDescription.invoicePurshaes",
      },
      {
        title: "Kreiraj novu fakturu",
        icon: CloudSyncIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/invoices/create"),
        },
        typeOfCard:  "invoicesSummary",
        description:  "Kreiranje novih izlaznih faktura",
      },
    ],
    templatePageSettings: {
      [TemplatePageTypes.SALES]: {
        title: "InvoiceCard.cardTitleSales",
        showBtns: true,
        buttons: [
          {
            title: "ButtonsText.TemplatePage.createDocument",
            disabled: false,
            btnFn: () => navigate("/invoices/create"),
            buttonId: 1,
          },
          {
            title: "ButtonsText.TemplatePage.createXML",
            disabled: true,
            btnFn: () => navigate("/invoices/create-xml"),
            buttonId:  2,
          },
        ],
        filters: [
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.registeredInCIR",
            multiOption: true,
            type: "solo",
            soloValue: "auto",
            filterItems: [],
            paramKey: "sendToCir",
            filterId: 1,
          },
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.allDocumentTypes",
            multiOption: false,
            type: "multi",
            filterItems: [
              { index: 0, name: "InvoiceTypes.debitInvoice", value: "380" },
              { index: 1, name: "InvoiceTypes.creditNote", value: "381" },
              { index: 2, name: "InvoiceTypes.debitNote", value: "384" },
              { index: 3, name: "InvoiceTypes.prepayment", value: "386" },
            ],
            paramKey: "typeDocument",
            filterId: 2,
          },
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.allStatuses",
            multiOption: false,
            type: "multi",
            filterItems: [
              { index: 0, name: "InvoiceStatuses.draft", value: "Draft" },
              { index: 1, name: "InvoiceStatuses.sent", value: "Sent" },
              { index: 2, name: "InvoiceStatuses.new", value: "New" },
              {
                index: 3,
                name: "InvoiceStatuses.cancelled",
                value: "Cancelled",
              },
              { index: 4, name: "InvoiceStatuses.approved", value: "Approved" },
              { index: 5, name: "InvoiceStatuses.rejected", value: "Rejected" },
              { index: 6, name: "InvoiceStatuses.storno", value: "Storno" },
              { index: 7, name: "InvoiceStatuses.sending", value: "Sending" },
              { index: 8, name: "InvoiceStatuses.paid", value: "Paid" },
              { index: 9, name: "InvoiceStatuses.mistake", value: "Mistake" },
              { index: 10, name: "InvoiceStatuses.overDue", value: "OverDue" },
              {
                index: 11,
                name: "InvoiceStatuses.archived",
                value: "Archived",
              },
              { index: 12, name: "InvoiceStatuses.deleted", value: "Deleted" },
              { index: 13, name: "InvoiceStatuses.unknown", value: "Unknown" },
              { index: 14, name: "InvoiceStatuses.seen", value: "Seen" },
            ],
            paramKey: "invoiceStatus",
            filterId:  3,
          },
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.allTime",
            multiOption: true,
            type: "date",
            soloValue: "auto",
            filterItems: [],
            paramKey: "date",
            filterId:  4,
          },
        ],
        actions: [
          {
            actionIcon: DeleteForeverIcon,
            actionName: "delete",
            hidden: true,
            title: "Common.delete",
            disabled: true,
          },
          {
            actionIcon: DownloadIcon,
            actionName: "downloadPdf",
            hidden: false,
            title: "Common.downloadPdf",
            disabled: false,
          },
          {
            actionIcon: DownloadIcon,
            actionName: "downloadXml",
            hidden: false,
            title: "Common.downloadXml",
            disabled: false,
          },
          {
            actionIcon: EventBusyIcon,
            actionName: "cancel",
            hidden: false,
            title: "Common.cancell",
            disabled: false,
          },
          {
            actionIcon: HistoryIcon,
            actionName: "storno",
            hidden: false,
            title: "Storniraj",
            disabled: false,
          },
        ],
        showTable: true,
        showFilterBox:  true
      },
      [TemplatePageTypes.PURCHASES]: {
        title: "InvoiceCard.cardTitlePurchases",
        showBtns: false,
        buttons: [],
        filters: [
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.registeredInCIR",
            multiOption: true,
            type: "solo",
            soloValue: "auto",
            filterItems: [],
            paramKey: "sendToCir",
            filterId: 1,
          },
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.allDocumentTypes",
            multiOption: false,
            type: "multi",
            filterItems: [
              { index: 0, name: "InvoiceTypes.debitInvoice", value: "380" },
              { index: 1, name: "InvoiceTypes.creditNote", value: "381" },
              { index: 2, name: "InvoiceTypes.debitNote", value: "384" },
              { index: 3, name: "InvoiceTypes.prepayment", value: "386" },
            ],
            paramKey: "typeDocument",
            filterId: 2,
          },
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.allStatuses",
            multiOption: false,
            type: "multi",
            filterItems: [
              { index: 0, name: "InvoiceStatuses.draft", value: "Draft" },
              { index: 1, name: "InvoiceStatuses.sent", value: "Sent" },
              { index: 2, name: "InvoiceStatuses.new", value: "New" },
              {
                index: 3,
                name: "InvoiceStatuses.cancelled",
                value: "Cancelled",
              },
              { index: 4, name: "InvoiceStatuses.approved", value: "Approved" },
              { index: 5, name: "InvoiceStatuses.rejected", value: "Rejected" },
              { index: 6, name: "InvoiceStatuses.storno", value: "Storno" },
              { index: 7, name: "InvoiceStatuses.sending", value: "Sending" },
              { index: 8, name: "InvoiceStatuses.paid", value: "Paid" },
              { index: 9, name: "InvoiceStatuses.mistake", value: "Mistake" },
              { index: 10, name: "InvoiceStatuses.overDue", value: "OverDue" },
              {
                index: 11,
                name: "InvoiceStatuses.archived",
                value: "Archived",
              },
              { index: 12, name: "InvoiceStatuses.deleted", value: "Deleted" },
              { index: 13, name: "InvoiceStatuses.unknown", value: "Unknown" },
              { index: 14, name: "InvoiceStatuses.seen", value: "Seen" },
            ],
            paramKey: "invoiceStatus",
            filterId: 3,
          },
          {
            transformedTitle: "FilterComponent.defaultAll",
            filterTitle: "FilterComponent.allTime",
            multiOption: true,
            type: "date",
            soloValue: "auto",
            filterItems: [],
            paramKey: "date",
            filterId: 4,
          },
        ],
        actions: [
          {
            actionIcon: DeleteForeverIcon,
            actionName: "delete",
            hidden: false,
            title: "Common.delete",
            disabled: true,
          },
          {
            actionIcon: DownloadIcon,
            actionName: "downloadPdf",
            hidden: false,
            title: "Common.downloadPdf",
            disabled: false,
          },
          {
            actionIcon: DownloadIcon,
            actionName: "downloadXml",
            hidden: false,
            title: "Common.downloadXml",
            disabled: false,
          },
          {
            actionIcon: AssignmentLateIcon,
            actionName: "reject",
            hidden: false,
            title: "Common.reject",
            disabled: false,
          },
          {
            actionIcon: AssignmentTurnedInIcon,
            actionName: "approve",
            hidden: false,
            title: "Common.approve",
            disabled: false,
          },
        ],
        showTable: true,
        showFilterBox:   true
      },
      [TemplatePageTypes.ERRORLOGS]: {
        title: "Logovi greske u zadnja 24h",
        showBtns: false,
        buttons: [],
        filters: [
          
        ],
        actions: [
         
        ],
        showTable: true,
        showFilterBox:  false
      },
    },
    salesTemplatePageSettings: {
      [CreateType.XML]: {
        title: "SalesTemplatePage.Title",
        rejectedTitle: "SalesTemplatePage.RejectedFiles",
        dropzonePlaceholder: "SalesTemplatePage.DropzonePlaceholder",
        dropzoneError: "SalesTemplatePage.file-invalid-type",
        cardErrorLabels: {
          title: "SalesTemplatePage.cardErrorLabels.title",
          fileName: "SalesTemplatePage.cardErrorLabels.fileName",
          errorCode: "SalesTemplatePage.cardErrorLabels.errorCode",
          fieldName: "SalesTemplatePage.cardErrorLabels.fieldName",
          errorMessage: "SalesTemplatePage.cardErrorLabels.errorMessage",
        },
      },
      [CreateType.FORM]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "InvoiceTypes.debitInvoice", value: InvoiceType.INVOICE },
            { name: "InvoiceTypes.prepayment", value: InvoiceType.PREPAYMENT },
            { name: "InvoiceTypes.creditNote", value: InvoiceType.CREDIT_NOTE },
            { name: "InvoiceTypes.debitNote", value: InvoiceType.DEBIT_NOTE },
          ],
        },
        sectionTitles: {
          title_1: "Form.sectionTitles.title_1",
          title_2: "Form.sectionTitles.title_2",
          title_3: "Form.sectionTitles.title_3",
          title_4: "Form.sectionTitles.title_4",
        },
        formGrpsSettings: {
          invoiceGrp: {
            title: "InvoiceTypes.debitInvoice",
            invoiceFields: {},
          },
          prepaymentGrp: {
            title: "InvoiceTypes.prepayment",
          },
          debitNoteGrp: {
            title: "InvoiceTypes.debitNote",
          },
          creditNoteGrp: {
            title: "InvoiceTypes.creditNote",
          },
          client: {
            title: "Client.title",
          },
        },
        formFieldsLabels: {
          id: "Form.formFieldsLabels.id",
          contractNumber: "Form.formFieldsLabels.contractNumber",
          orderNumber: "Form.formFieldsLabels.orderNumber",
          referenceNumber: "Form.formFieldsLabels.referenceNumber",
          lotNumber: "Form.formFieldsLabels.lotNumber",
          warehouse_uuid: "Form.formFieldsLabels.warehouse_uuid",
          modelNumber: "Form.formFieldsLabels.modelNumber",
          finalSum: "Form.formFieldsLabels.finalSum",
          finalSumLetters: "Form.formFieldsLabels.finalSumLetters",
          client: {
            companyName: "Client.companyName",
            address: "Client.address",
            registrationCode: "Client.clientRegistrationCode",
            vatRegistrationCode: "Client.clientVatRegistrationCode",
            clientEmail: "Client.clientEmail",
            clientCity: "Client.clientCity",
            zipCode: "Client.zipCode",
          },
          invoiceItems: {
            search: {
              label: "Search.label",
              placeholder: "Search.placeholder",
              noResult: "Search.noResult",
            },
            invoiceLine: {
              productName: "Form.formFieldsLabels.productName",
              unitPrice: "Form.formFieldsLabels.unitPrice",
              invoicedQuantity: "Form.formFieldsLabels.invoicedQuantity",
              unitCode: "Form.formFieldsLabels.unitCode",
              discount: "Form.formFieldsLabels.discount",
              newPrice: "Form.formFieldsLabels.newPrice",
              percent: "Form.formFieldsLabels.percent",
              unitTaxAmount: "Form.formFieldsLabels.unitTaxAmount",
              priceAmount: "Form.formFieldsLabels.priceAmount",
            },
          },
          priceWithoutDiscount: "Form.formFieldsLabels.priceWithoutDiscount",
          taxableAmount: "Form.formFieldsLabels.taxableAmount",
          sumWithDiscount: "Form.formFieldsLabels.sumWithDiscount",
          taxAmount: "Form.formFieldsLabels.taxAmount",
        },
      },
    },
  };
};

export { useFeatureSettings };
