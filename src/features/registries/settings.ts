import { CardProps } from "../shared/components/CardComponent";
import CodeIcon from "@mui/icons-material/Code";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import { useNavigate } from "react-router-dom";
import { TemplatePageRegistriesTypes } from "./models/registries.enums";
import { ButtonProps, SelectButtonProps } from "../shared/components/CustomButtonFc";
import { CreateType } from "./models/registries.enums";
import { RegistriesFormComponentProps } from "./components/RegistriesFormComponent";
import { selectMarketPlaces, selectPointOfSale } from "../shared/components/form-fields/store/form.selectors";


type FeatureSettings = {
  cardsSettings: CardProps[];
  templatePageSettings: {
    [key in TemplatePageRegistriesTypes]: {
      title: string;
      showBtns: boolean;
      showBtnsSelect: boolean;
      buttons: ButtonProps[];
      buttonsSelect: SelectButtonProps;
      //filters: FilterComponentProps[];
      // actions: SelectAllAction[];
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
        title: "Companies.title",
        icon: CodeIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/companies"),
        },
        typeOfCard:  "company",
      },
      {
        title: "Objects.title",
        icon: ExitToAppIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/objects"),
        },
        typeOfCard:  "company",
      },
      {
        title: "MarketPlace.title",
        icon: CodeIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/marketPlace"),
        },
        typeOfCard:  "company",
      },
      {
        title: "PointOfSale.title",
        icon: CloudSyncIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/pointOfSale"),
        },
        typeOfCard:  "company",
      },
      {
        title: "Warehouses.title",
        icon: CodeIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/warehouse"),
        },
        typeOfCard:  "company",
      },
      {
        title: "Units",
        icon: ExitToAppIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/units"),
        },
        typeOfCard:  "articles",
      },
      {
        title: "PDV",
        icon: ExitToAppIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/vat"),
        },
        typeOfCard:  "articles",
      },
      
      {
        title: "Korisnici",
        icon: ExitToAppIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/users"),
        },
        typeOfCard:  "articles",
      },
      {
        title: "Grupe",
        icon: ExitToAppIcon,
        cardBtn: {
          title: "InvoiceCard.preview",
          disabled: false,
          btnFn: () => navigate("/registries/groups"),
        },
        typeOfCard:  "articles",
      },
    ],
    templatePageSettings: {
      [TemplatePageRegistriesTypes.OBJECTS]: {
        title: "Objects.title",
        showBtns: true,
        showBtnsSelect: false,
        buttons: [
          {
            title: "Objects.createNew",
            disabled: false,
            btnFn: () => navigate("/registries/createObject"),
          },
        ],
        buttonsSelect:  {
          name: '',
          label: '',
          selector: ''
        },
      
        showTable: true,
      },
      [TemplatePageRegistriesTypes.MARKETPLACE]: {
        title: "MarketPlace.title",
        showBtns: true,
        showBtnsSelect: false,
        buttons: [
          {
            title: "MarketPlace.createNew",
            disabled: false,
            btnFn: () => navigate("/registries/createMarketPlace"),
          },
        ],
        buttonsSelect:  {
          name: '',
          label: '',
          selector: ''
        },
        
        showTable: true,
      },
      [TemplatePageRegistriesTypes.POINTOFSALE]: {
        title: "PointOfSale.title",
        showBtns: true,
        showBtnsSelect: false,
        buttons: [
          {
            title: "PointOfSale.createNew",
            disabled: false,
            btnFn: () => navigate("/registries/createPointOfSale"),
          },
        ],
        buttonsSelect:  {
          name: '',
          label: '',
          selector: ''
        },
       
        showTable: true,
      },
      [TemplatePageRegistriesTypes.COMPANIES]: {
        title: "Companies.title",
        showBtns: true,
        showBtnsSelect: false,
        buttons: [
          {
            title: "Companies.createNew",
            disabled: false,
            btnFn: () => navigate("/registries/createCompany"),
          },
        ],
        buttonsSelect:  {
          name: '',
          label: '',
          selector: ''
        },
        showTable: true,
      },
      [TemplatePageRegistriesTypes.WAREHOUSES]: {
        title: "Warehouses.title",
        showBtns: true,
        showBtnsSelect: true,
        buttons: [
          {
            title: "Warehouses.createNew",
            disabled: false,
            btnFn: () => navigate("/registries/createWarehouse"),
          },
        ],
  
        buttonsSelect:  {
          name:  'marketPlace',
          label: 'Market  place',
          selector:  selectMarketPlaces
        },
        showTable: true,
      },
      [TemplatePageRegistriesTypes.UNITS]: {
        title: "Units",
        showBtns: true,
        showBtnsSelect: false,
        buttons: [
          {
            title: "Kreiraj novi unit",
            disabled: false,
            btnFn: () => navigate("/registries/createUnit"),
          },
        ],
        buttonsSelect:  {
          name: '',
          label: '',
          selector: ''
        },
        showTable: true,
      },
      [TemplatePageRegistriesTypes.VAT]: {
        title: "PDV",
        showBtns: true,
        showBtnsSelect: false,
        buttons: [
          {
            title: "Kreiraj novi pdv",
            disabled: false,
            btnFn: () => navigate("/registries/createVat"),
          },
        ],
        buttonsSelect:  {
          name: '',
          label: '',
          selector: ''
        },
        showTable: true,
      },
      [TemplatePageRegistriesTypes.USERS]: {
        title: "Korisnici",
        showBtns: true,
        showBtnsSelect: false,
        buttons: [
          {
            title: "Kreiraj novog korisnika",
            disabled: false,
            btnFn: () => navigate("/registries/createUser"),
          },
        ],
        buttonsSelect:  {
          name: '',
          label: '',
          selector: ''
        },
        showTable: true,
      },
      [TemplatePageRegistriesTypes.GROUPS]: {
        title: "Grupe",
        showBtns: true,
        showBtnsSelect: true,
        buttons: [
          {
            title: "Kreiraj novu grupu",
            disabled: false,
            btnFn: () => navigate("/registries/createGroup"),
          },
        ],
        buttonsSelect:  {
          name: 'pointOfSale',
          label: 'Point of sale',
          selector: selectPointOfSale
        },
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
      [CreateType.FORMCOMPANY]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "test", value: 10 },
          ],
        },
        createTitle: {
          title: "NOVI KOMPANIJA"
        },

        typeForm : "companies",

        sectionTitles: {
          title_1: "PODACI O KOMPANIJI",
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
          companies: {
            companiName: "Companies.nameOfCompany",
            pib: "Companies.pib",
            mb:   "Companies.mb",
            apyKey: "ApyKey",
            adress:  "Companies.adress",
            zip:  "Companies.zip",
            city:  "Companies.city",
            country:  "Companies.country"
          }
        },
      },
      [CreateType.FORMWAREHOUSE]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "test", value: 10 },
          ],
        },
        createTitle: {
          title: "NOVI MAGACIN"
        },

        typeForm : "warehouses",

        sectionTitles: {
          title_1: "PODACI O MAGACINU",
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
          warehouse:  {
            name: "Warehouses.name",
            marketPlace: "Warehouses.marketPlace"
          }
        },
      },
      [CreateType.FORMUNIT]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "test", value: 10 },
          ],
        },
        createTitle: {
          title: "NOVI UNIT"
        },

        typeForm : "units",

        sectionTitles: {
          title_1: "PODACI O UNIT",
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
      [CreateType.FORMGROUP]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "test", value: 10 },
          ],
        },
        createTitle: {
          title: "NOVA GRUPA"
        },

        typeForm : "groups",

        sectionTitles: {
          title_1: "PODACI O GRUPI",
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
      [CreateType.FORMVAT]: {
        invoiceTypeOptions: {
          name: "invoice_type",
          optionLabel: "TableColumns.InvoiceType",
          options: [
            { name: "test", value: 10 },
          ],
        },
        createTitle: {
          title: "NOVI PDV"
        },

        typeForm : "vats",

        sectionTitles: {
          title_1: "PODACI O PDV",
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
    },
    
    
  };
};

export { useFeatureSettings };
