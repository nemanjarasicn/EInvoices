import { CardProps } from "../shared/components/CardComponent";
import { useNavigate } from "react-router-dom";
import { TemplatePageArticlesTypes } from  "./models/articles.enums"
import { ButtonProps, SelectButtonProps } from "../shared/components/CustomButtonFc";
import ArticleIcon from '@mui/icons-material/Article';
import { selectMarketPlaces } from "../shared/components/form-fields/store/form.selectors";

import { ArticlesFormComponentProps }  from "../articles/components/ArticlesFormComponent"
import { CreateType } from   "../articles/models/articles.enums"
import { useAppDispatch } from "../../app/hooks";
import  { setopenModalCreateArtical,  setopenModalCreateSubject }  from  "./store/articles.reducer"


type FeatureSettings = {
  cardsSettings: CardProps[];
  templatePageSettings: {
    [key in TemplatePageArticlesTypes]: {
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
  ArticlesCreateTemplatePageSettings: {
    [key in CreateType]: ArticlesFormComponentProps;
  };
};
/**
 * hook predefine settings
 * @returns {FeatureSettings}
 */
const useFeatureSettings = (): FeatureSettings => {
  let navigate = useNavigate();
  const  dispatch = useAppDispatch();
  return {
    cardsSettings: [{
            title: "Articles.title",
            icon: ArticleIcon,
            cardBtn: {
              title: "InvoiceCard.preview",
              disabled: false,
              btnFn: () => navigate("/articles/articlesList"),
            },
            typeOfCard:  "articles",
            description:  "MenuDescription.articles"
    },
    {
      title: "Komitenti",
      icon: ArticleIcon,
      cardBtn: {
        title: "InvoiceCard.preview",
        disabled: false,
        btnFn: () => navigate("/articles/subject"),
      },
      typeOfCard:  "articles",
      description:  "MenuDescription.articles"
}],
    templatePageSettings: {
        [TemplatePageArticlesTypes.LIST]: {
          title: "Articles.title",
          showBtns: true,
          showBtnsSelect: true,
          buttons: [
            {
              title: "Articles.createNew",
              disabled: false,
              btnFn: () => dispatch(setopenModalCreateArtical(true)), //dispatch(setopenModalCreateArtical(true)),//navigate("/articles/createArtikal"),
            },
          ],
          buttonsSelect:  {
            name: 'marketplases',
            label:  'Prodajna mesta',
            selector:  selectMarketPlaces
          },
        
          showTable: true,
        },

        [TemplatePageArticlesTypes.SUBJECT]: {
          title: "Komitenti",
          showBtns: true,
          showBtnsSelect: false,
          buttons: [
            {
              title: "Kreiraj novog komitenta",
              disabled: false,
              btnFn: () =>   dispatch(setopenModalCreateSubject({open:  true}))//navigate("/articles/createSubject"),
            },
          ],
          buttonsSelect:  {
            name: 'marketplases',
            label:  'Prodajna mesta',
            selector:  selectMarketPlaces
          },
        
          showTable: true,
        },
      
      },
    ArticlesCreateTemplatePageSettings: {
        [CreateType.FORMARTICLES]: {
          invoiceTypeOptions: {
            name: "invoice_type",
            optionLabel: "TableColumns.InvoiceType",
            options: [
              { name: "test", value: 10 },
            ],
          },
          createTitle: {
            title: "NOVI ARTIKAL"
          },
  
          typeForm : "articles",
  
          sectionTitles: {
            title_1: "PODACI O ARTIKLU",
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
        [CreateType.FORMARTICLESPRICE]: {
          invoiceTypeOptions: {
            name: "invoice_type",
            optionLabel: "TableColumns.InvoiceType",
            options: [
              { name: "test", value: 10 },
            ],
          },
          createTitle: {
            title: "KREIRAJ CENU"
          },
  
          typeForm : "articles",
  
          sectionTitles: {
            title_1: "PODACI O CENI",
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

        [CreateType.FORMSUBJECT]: {
          invoiceTypeOptions: {
            name: "invoice_type",
            optionLabel: "TableColumns.InvoiceType",
            options: [
              { name: "test", value: 10 },
            ],
          },
          createTitle: {
            title: "NOVI KOMITENT"
          },
  
          typeForm : "subject",
  
          sectionTitles: {
            title_1: "PODACI O KOMITENTU",
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
