import { CardProps } from "./components/CardComponent";
import CodeIcon from "@mui/icons-material/Code";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useNavigate } from "react-router-dom";
import { TemplatePageRegistriesTypes } from "./models/registries.enums";
import { ButtonProps } from "./components/CustomButtonFc";
import { FilterComponentProps } from "./components/FilterComponent";
import { CreateType } from "./models/registries.enums";
import { RegistriesFormComponentProps } from "./components/RegistriesFormComponent";
import { SelectAllAction } from "./components/SelectAllActionsComponent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DownloadIcon from "@mui/icons-material/Download";


type FeatureSettings = {
  cardsSettings: CardProps[];
  templatePageSettings: {
    [key in TemplatePageRegistriesTypes]: {
      title: string;
      showBtns: boolean;
      buttons: ButtonProps[];
      filters: FilterComponentProps[];
      actions: SelectAllAction[];
      showTable: boolean;
    };
  };
  RegistriesCreateTemplatePageSettings: {
    [key in CreateType]: RegistriesFormComponentProps;
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
        title: "Objekti",
        icon: ExitToAppIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/objects"),
        },
      },
      {
        title: "Prodajna mesta",
        icon: CodeIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/marketPlace"),
        },
      },
      {
        title: "Kase",
        icon: CloudSyncIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/pointOfSale"),
        },
      },
    ],
    templatePageSettings: {
      [TemplatePageRegistriesTypes.OBJECTS]: {
        title: "Objekti",
        showBtns: true,
        buttons: [
          {
            title: "Kreiraj novi objekat",
            disabled: false,
            btnFn: () => navigate("/registries/createObject"),
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
        showTable: true,
      },
      [TemplatePageRegistriesTypes.MARKETPLACE]: {
        title: "Prodajna mesta",
        showBtns: true,
        buttons: [
          {
            title: "Kreiraj novo prodajno mesto",
            disabled: false,
            btnFn: () => navigate("/main/registries/createMarketPlace"),
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
        showTable: true,
      },
      [TemplatePageRegistriesTypes.POINTOFSALE]: {
        title: "Kase",
        showBtns: true,
        buttons: [
          {
            title: "Kreiraj novu kasu",
            disabled: false,
            btnFn: () => navigate("/main/registries/createPointOfSale"),
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
        showTable: true,
      },
    
    },
    RegistriesCreateTemplatePageSettings: {
      [CreateType.FORMOBJECT]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "test", value: 10 },
          ],
        },
        createTitle: {
          title: "NOVI OBJEKAT"
        },

        typeForm : "objects",

        sectionTitles: {
          title_1: "PODACI O OBJEKTU",
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
            title: "Kompanija",
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
          objects:  {
            name: "Objects.name",
            longitude: "Objects.longitude",
            latitude: "Objects.latitude",
            company: "Objects.company"
          }
        },
      },
      [CreateType.FORMMARKETPLACE]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "test", value: 10 },
          ],
        },
        createTitle: {
          title: "NOVO PRODAJNO MESTO"
        },

        typeForm : "marketPlace",

        sectionTitles: {
          title_1: "PODACI O PRODAJNOM MESTU",
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
          marketPlace:  {
            name: "MarketPlace.name",
            uuidObject: "MarketPlace.uuidObject",
            company: "Objects.company",
        
          }
        },
      },
      [CreateType.FORMPOINTOFSALE]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "test", value: 10 },
          ],
        },
        createTitle: {
          title: "NOVA KASA"
        },

        typeForm : "pointOfSale",

        sectionTitles: {
          title_1: "PODACI O KASI",
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
          pointOfSale:  {
            name: "PointOfSale.name",
          
            company: "PointOfSale.company",
            code: "PointOfSale.code",
            marketPlace:  "PointOfSale.marketPlace"
          }
        },
      },
    },
    
    
  };
};

export { useFeatureSettings };
