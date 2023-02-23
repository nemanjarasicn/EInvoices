import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

function useSchemaValidator(jbkjs: string, selectionModeTmp: number) {
  const { t } = useTranslation();
  /**
   * Register Form validation schema for every field
   */
  const schema = yup
    .object({
      foundClient: yup
        .object()
        .test(
          '',
          t('Validation.buyer'),
          (val) => val && Boolean(Object.keys(val).length)
        ),
      id: yup.string().required(''),
      invoiceLine: yup
        .array()
        .min(1, t('Validation.items'))
        .of(
          yup.object({
            invoicedQuantity: yup.number().typeError('').moreThan(0, ''),
          })
        ),
      referenceNumber: yup.string().required(''),
      modelNumber: yup
        .string()
        .min(2, 'Mora imati dve cifre')
        .max(2, 'Mora imati dve cifre')
        .required(''),

      contractNumber: yup
        .string()
        .test('', 'Jedan od tri polja moraju biti popunjeni', function (item) {
          if (jbkjs !== '') {
            return (
              this.parent.contractNumber ||
              this.parent.lotNumber ||
              this.parent.orderNumber
            );
          } else {
            return true;
          }
        }),
      lotNumber: yup
        .string()
        .test('', 'Jedan od tri polja moraju biti popunjeni', function (item) {
          if (jbkjs !== '') {
            return (
              this.parent.contractNumber ||
              this.parent.lotNumber ||
              this.parent.orderNumber
            );
          } else {
            return true;
          }
        }),
      orderNumber: yup
        .string()
        .test('', 'Jedan od tri polja moraju biti popunjeni', function (item) {
          if (jbkjs !== '') {
            return (
              this.parent.contractNumber ||
              this.parent.lotNumber ||
              this.parent.orderNumber
            );
          } else {
            return true;
          }
        }),

      modePeriodFrom: yup
        .string()
        .test(
          '',
          'Ovo polje je obavezno kada je izabrano Fakture u periodu',
          function (item) {
            if (selectionModeTmp === 2) {
              return this.parent.modePeriodFrom === 'Invalid Date'
                ? false
                : true;
            } else {
              return true;
            }
          }
        ),

      modePeriodTo: yup
        .string()
        .test(
          '',
          'Ovo polje je obavezno kada je izabrano Fakture u periodu',
          function (item) {
            if (selectionModeTmp === 2) {
              return this.parent.modePeriodTo === 'Invalid Date' ? false : true;
            } else {
              return true;
            }
          }
        ),
    })
    .required();

  return schema;
}

export { useSchemaValidator };
