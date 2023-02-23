import React from 'react';
import InvoiceDropzoneComponent, {
  InvoiceDropzoneProps,
} from '../components/InvoiceDropzoneComponent';
import InvoiceFormComponent, {
  InvoiceFormComponentProps,
} from '../components/InvoiceFormComponent';
import { CreateType } from '../models/invoice.enums';
import { IProps } from '../models/invoice.models';
import { useFeatureSettings } from '../settings';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type SalesTemplateProps = {
  type: CreateType;
};

export default function SalesTemplatePage({
  props,
}: IProps<SalesTemplateProps>): JSX.Element {
  const { salesTemplatePageSettings } = useFeatureSettings();
  const { t } = useTranslation();
  const boxMarginTop = window.devicePixelRatio === 1.5 ? 6 : 10;
  const fontSizeBreadcrumbs = window.devicePixelRatio === 1.5 ? '16px' : '20px';
  return (
    <>
      {(() => {
        switch (props.type) {
          case CreateType.XML:
            return (
              <InvoiceDropzoneComponent
                props={
                  salesTemplatePageSettings[
                    CreateType.XML
                  ] as InvoiceDropzoneProps
                }
              />
            );

          case CreateType.FORM:
            return (
              <>
                <Box sx={{ mt: boxMarginTop, mb: '38px' }}>
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      '& .MuiBreadcrumbs-separator': { color: ' #60737C' },
                    }}
                  >
                    <Link
                      sx={{
                        color: '#60737C',
                        fontSize: fontSizeBreadcrumbs,
                        fontFamily: 'Roboto',
                        lineHeight: '32px',
                        fontWeight: 700,
                      }}
                      href="/invoices"
                    >
                      {t('Menu.invoice')}
                    </Link>
                    <Link
                      sx={{
                        color: '#60737C',
                        fontSize: fontSizeBreadcrumbs,
                        fontFamily: 'Roboto',
                        lineHeight: '32px',
                        fontWeight: 700,
                      }}
                      href="/invoices/sales"
                    >
                      {t('InvoiceCard.cardTitleSales')}
                    </Link>
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: fontSizeBreadcrumbs,
                        fontFamily: 'Roboto',
                        lineHeight: '32px',
                        fontWeight: 700,
                      }}
                    >
                      {t('ButtonsText.TemplatePage.createDocument')}
                    </Typography>
                  </Breadcrumbs>
                </Box>
                <InvoiceFormComponent
                  props={
                    salesTemplatePageSettings[
                      CreateType.FORM
                    ] as InvoiceFormComponentProps
                  }
                />
              </>
            );
          default:
            throw new Error('Pass Type of creation');
        }
      })()}
    </>
  );
}
