import { CardProps } from '../shared/components/CardComponent';
import { useNavigate } from 'react-router-dom';
import { TemplatePageArticlesTypes } from './models/articles.enums';
import {
  ButtonProps,
  SelectButtonProps,
} from '../shared/components/CustomButtonFc';
import ArticleIcon from '@mui/icons-material/Article';
import { selectMarketPlaces } from '../shared/components/form-fields/store/form.selectors';

import { ArticlesFormComponentProps } from '../articles/components/ArticlesFormComponent';
import { CreateType } from '../articles/models/articles.enums';
import { useAppDispatch } from '../../app/hooks';
import {
  setopenModalCreateArtical,
  setopenModalCreateSubject,
} from './store/articles.reducer';

type FeatureSettings = {
  cardsSettings: CardProps[];
  templatePageSettings: {
    [key in TemplatePageArticlesTypes]: {
      title: string;
      showBtns: boolean;
      showBtnsSelect: boolean;
      buttons: ButtonProps[];
      buttonsSelect: SelectButtonProps;
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
  const dispatch = useAppDispatch();
  return {
    cardsSettings: [
      {
        title: 'Articles.title',
        icon: ArticleIcon,
        cardBtn: {
          title: 'InvoiceCard.preview',
          disabled: false,
          btnFn: () => navigate('/articles/articlesList'),
        },
        typeOfCard: 'articles',
        description: 'MenuDescription.articles',
      },
      {
        title: 'Subject.title',
        icon: ArticleIcon,
        cardBtn: {
          title: 'InvoiceCard.preview',
          disabled: false,
          btnFn: () => navigate('/articles/subject'),
        },
        typeOfCard: 'articles',
        description: 'MenuDescription.articles',
      },
    ],
    templatePageSettings: {
      [TemplatePageArticlesTypes.LIST]: {
        title: 'Articles.title',
        showBtns: true,
        showBtnsSelect: true,
        buttons: [
          {
            title: 'Articles.createNew',
            disabled: false,
            btnFn: () => dispatch(setopenModalCreateArtical({ open: true })), //dispatch(setopenModalCreateArtical(true)),//navigate("/articles/createArtikal"),
          },
        ],
        buttonsSelect: {
          name: 'marketplases',
          label: 'Prodajna mesta',
          selector: selectMarketPlaces,
        },

        showTable: true,
      },

      [TemplatePageArticlesTypes.SUBJECT]: {
        title: 'Subject.title',
        showBtns: true,
        showBtnsSelect: false,
        buttons: [
          {
            title: 'Subject.createNew',
            disabled: false,
            btnFn: () => dispatch(setopenModalCreateSubject({ open: true })), //navigate("/articles/createSubject"),
          },
        ],
        buttonsSelect: {
          name: 'marketplases',
          label: 'Prodajna mesta',
          selector: selectMarketPlaces,
        },

        showTable: true,
      },
    },
    ArticlesCreateTemplatePageSettings: {
      [CreateType.FORMARTICLES]: {
        invoiceTypeOptions: {
          name: 'invoice_type',
          optionLabel: 'TableColumns.InvoiceType',
          options: [{ name: 'test', value: 10 }],
        },
        createTitle: {
          title: 'NOVI ARTIKAL',
        },

        typeForm: 'articles',

        sectionTitles: {
          title_1: 'PODACI O ARTIKLU',
        },
       
        formFieldsLabels: {
          
          objects: {
            name: 'Objects.name',
            longitude: 'Objects.longitude',
            latitude: 'Objects.latitude',
            company: 'Objects.company',
          },
        },
      },
      [CreateType.FORMARTICLESPRICE]: {
        invoiceTypeOptions: {
          name: 'invoice_type',
          optionLabel: 'TableColumns.InvoiceType',
          options: [{ name: 'test', value: 10 }],
        },
        createTitle: {
          title: 'KREIRAJ CENU',
        },

        typeForm: 'articles',

        sectionTitles: {
          title_1: 'PODACI O CENI',
        },
        
        formFieldsLabels: {
          
          objects: {
            name: 'Objects.name',
            longitude: 'Objects.longitude',
            latitude: 'Objects.latitude',
            company: 'Objects.company',
          },
        },
      },

      [CreateType.FORMSUBJECT]: {
        invoiceTypeOptions: {
          name: 'invoice_type',
          optionLabel: 'TableColumns.InvoiceType',
          options: [{ name: 'test', value: 10 }],
        },
        createTitle: {
          title: 'NOVI KOMITENT',
        },

        typeForm: 'subject',

        sectionTitles: {
          title_1: 'PODACI O KOMITENTU',
        },
        
        formFieldsLabels: {
          
          objects: {
            name: 'Objects.name',
            longitude: 'Objects.longitude',
            latitude: 'Objects.latitude',
            company: 'Objects.company',
          },
        },
      },
    },
  };
};

export { useFeatureSettings };
