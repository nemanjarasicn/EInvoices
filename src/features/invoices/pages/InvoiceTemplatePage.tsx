/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import * as yup from 'yup';
import { Grid, Box, Typography } from '@mui/material';
import { useFeatureSettings } from '../settings';
import { TemplatePageTypes } from '../models/invoice.enums';
import { useTranslation } from 'react-i18next';
import { usePageStyles } from './pages.styles';
import { IProps } from '../models/invoice.models';
import { useTableSettings } from '../components/DataGrid/table.settings';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import TableComponent from '../components/DataGrid/TableComponent';
import CustomButtonFc from '../components/CustomButtonFc';
import FiltersToolbarComponent from '../components/FiltersToolbarComponent';
import CustomFilterBox from '../../shared/components/form-fields/CustomFilterBox';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

//for zip
import JSZip from 'jszip';
import * as FileSaver from 'file-saver';

export type InvoiceTemplatePageProps = {
  templateType: TemplatePageTypes;
};

// --------------ZIP -------------------------------------
const zip = new JSZip();

export const unzipFileData = async (zipDataT: any) => {
  await zip.loadAsync(zipDataT.payload, { base64: true }).then(function (zip) {
    Object.keys(zip.files).map((filename) => {
      zip.files[filename].async('blob').then(async function (fileData) {
        return await fileData.slice(2).text();
      });
    });
  });
};

// function for unzip file
export const unzipFile = async (flag: string, zipDataT: any) => {
  await zip.loadAsync(zipDataT.payload, { base64: true }).then(function (zip) {
    Object.keys(zip.files).map((filename) => {
      const extName = flag === 'PDF' ? '.pdf' : '.xml';
      const filenameDownload = filename.slice(0, filename.length - 4) + extName;
      zip.files[filename].async('blob').then(async function (fileData) {
        const dataDownload = await fileData.slice(2).text();
        flag === 'PDF'
          ? downloadPDF(dataDownload, filenameDownload)
          : downloadXml(fileData.slice(2), filenameDownload);
      });
    });
  });
};

export const downloadPDF = (pdf: string, fileName: string) => {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement('a');

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

function downloadXml(data: Blob, fileName: string) {
  FileSaver.saveAs(data, fileName);
}

// ---------------END ZIP ----------------------------------

export default function InvoiceTemplatePage({
  props,
}: IProps<InvoiceTemplatePageProps>): JSX.Element {
  const { t } = useTranslation();
  const { templatePageSettings } = useFeatureSettings();
  const { tableSettings } = useTableSettings();
  const { templatePageStyles } = usePageStyles();

  const boxMarginTop = window.devicePixelRatio === 1.5 ? 6 : 10;

  const date = new Date();

  const today = format(date, 'yyyy-MM-dd');

  const schema = yup
    .object({
      from: yup.string(),
      to: yup.string(),
    })
    .required();

  const methods = useForm({
    defaultValues: {
      from: today,
      to: today,
      sendToCir: false,
    },
    resolver: yupResolver(schema),
  });
  const { watch } = methods;

  React.useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  const fontSizeBreadcrumbs = window.devicePixelRatio === 1.5 ? '16px' : '20px';

  return (
    <Box sx={{ flexGrow: 1, mt: boxMarginTop }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/*<Item>*/}
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ '& .MuiBreadcrumbs-separator': { color: ' #60737C' } }}
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
            <Typography
              sx={{
                color: 'white',
                fontSize: fontSizeBreadcrumbs,
                fontFamily: 'Roboto',
                lineHeight: '32px',
                fontWeight: 700,
              }}
            >
              {t(templatePageSettings[props.templateType].title)}
            </Typography>
          </Breadcrumbs>
          {/*</Item>*/}
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            mt: '38px',
          }}
        >
          <Grid item xs={12} style={templatePageStyles.buttonsActionGrid}>
            {templatePageSettings[props.templateType].showBtns && (
              <CustomButtonFc
                groupButton={templatePageSettings[props.templateType].buttons}
              />
            )}
          </Grid>
        </Grid>

        <Grid
          container
          sx={{ backgroundColor: 'white', mt: 2, borderRadius: '15px', ml: 2 }}
          spacing={2}
        >
          {templatePageSettings[props.templateType].showFilterBox && (
            <Grid item xs={12} style={templatePageStyles.buttonsGrid}>
              <CustomFilterBox
                props={{
                  filters: templatePageSettings[props.templateType].filters,
                  actions: templatePageSettings[props.templateType].actions,
                  type: props.templateType,
                }}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <FiltersToolbarComponent
              props={{
                filters: templatePageSettings[props.templateType].filters,
                actions: templatePageSettings[props.templateType].actions,
                type: props.templateType,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {templatePageSettings[props.templateType].showTable && (
              <TableComponent
                props={tableSettings[props.templateType].dataGrid}
              />
            )}
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
