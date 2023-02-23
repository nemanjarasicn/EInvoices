/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { IProps } from '../../models';
import { Grid, IconButton } from '@mui/material';
import FormTextField from '../form-fields/FormTextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormCurrencyField from '../form-fields/FormCurrencyField';
import FormAutocompleteField from '../../../shared/components/form-fields/FormAutocompleteField';
import {
  calculateNewDiscount,
  calculateNewPrice,
  calculateTax,
  calculateTotal,
} from '../../utils/utils';
import { useTranslation } from 'react-i18next';
import FormDropdownField from '../form-fields/FormDropdownField';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getTaxBase } from '../../store/invoice.actions';
import { selectTaxBase } from '../../../shared/components/form-fields/store/form.selectors';

type InvoiceLineProps = {
  item: any;
  control: any;
  index: number;
  handleAddItemList: Function;
  formWatch: Function;
  formSetValue: Function;
  formGetValues: Function;
  fieldLabels: any;
};

export default function InvoiceLine({
  props,
}: IProps<InvoiceLineProps>): JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    control,
    formWatch,
    formSetValue,
    formGetValues,
    index,
    fieldLabels,
  } = props;

  const vatRate = formGetValues(
    `invoiceLine[${index}].item.classifiedTaxCategory.percent`
  )
    ? true
    : false;

  const [options, setOptions] = React.useState(useAppSelector(selectTaxBase));

  const handleTab = (event: any) => {
    if (event.key === 'Tab') {
      props.handleAddItemList(index);
    }
  };

  /*React.useEffect(() => {
    const newPrice: any =   Number(formGetValues(`invoiceLine[${index}].price.unitPrice`))
    formSetValue(`invoiceLine[${index}].price.newPrice`, newPrice)
  }, []);*/

  //Subscribe on watch invoicedQuantity
  React.useEffect(() => {
    if (Number(formGetValues(`invoiceLine[${index}].price.discount`) > 0)) {
      formSetValue(
        `invoiceLine[${index}].price.priceAmount`,
        Number(formGetValues(`invoiceLine[${index}].price.newPrice`)) *
          Number(formWatch(`invoiceLine[${index}].invoicedQuantity`))
      );
    } else {
      formSetValue(
        `invoiceLine[${index}].price.priceAmount`,
        Number(formGetValues(`invoiceLine[${index}].price.unitPrice`)) *
          Number(formWatch(`invoiceLine[${index}].invoicedQuantity`))
      );
    }
  }, [formWatch(`invoiceLine[${index}].invoicedQuantity`)]);

  //Subscribe on watch priceAmount
  React.useEffect(() => {
    const _tax: number = calculateTax(
      Number(formWatch(`invoiceLine[${index}].price.priceAmount`)),
      Number(
        formGetValues(
          `invoiceLine[${index}].item.classifiedTaxCategory.percent`
        )
      )
    );
    formSetValue(`invoiceLine[${index}].price.unitTaxAmount`, _tax);
  }, [formWatch(`invoiceLine[${index}].price.priceAmount`)]);

  //Subscribe on watch price discount
  React.useEffect(() => {
    const newPrice = calculateNewPrice(
      Number(formGetValues(`invoiceLine[${index}].price.unitPrice`)),
      Number(formWatch(`invoiceLine[${index}].price.discount`))
    );
    formSetValue(`invoiceLine[${index}].price.newPrice`, newPrice);
  }, [formWatch(`invoiceLine[${index}].price.discount`)]);

  //Subscribe on watch price discount
  React.useEffect(() => {
    formSetValue(
      `invoiceLine[${index}].price.priceAmount`,
      Number(formGetValues(`invoiceLine[${index}].price.newPrice`)) *
        Number(formWatch(`invoiceLine[${index}].invoicedQuantity`))
    );
  }, [formWatch(`invoiceLine[${index}].price.newPrice`)]);

  // Subscribe on total value
  React.useEffect(() => {
    const total = calculateTotal(formGetValues(`invoiceLine`));
    formSetValue(`finalSum`, total);
  }, [formWatch(`invoiceLine[${index}].price.priceAmount`)]);

  //Subscribe on watch unit price
  React.useEffect(() => {
    const newPrice = calculateNewPrice(
      Number(formGetValues(`invoiceLine[${index}].price.unitPrice`)),
      Number(formWatch(`invoiceLine[${index}].price.discount`))
    );
    formSetValue(`invoiceLine[${index}].price.newPrice`, newPrice);
  }, [formWatch(`invoiceLine[${index}].price.unitPrice`)]);

  const handleChangeDiscount = () => {
    /*const newPrice = calculateNewPrice(
      Number(formGetValues(`invoiceLine[${index}].price.unitPrice`)),
      Number(formWatch(`invoiceLine[${index}].price.discount`))
    );
    formSetValue(`invoiceLine[${index}].price.newPrice`, newPrice);*/
  };

  const handleChangeNewPrice = () => {
    if (
      Number(formWatch(`invoiceLine[${index}].price.newPrice`)) <=
      Number(formGetValues(`invoiceLine[${index}].price.unitPrice`))
    ) {
      const newDiscount = calculateNewDiscount(
        Number(formGetValues(`invoiceLine[${index}].price.unitPrice`)),
        Number(formWatch(`invoiceLine[${index}].price.newPrice`))
      );
      formSetValue(`invoiceLine[${index}].price.discount`, newDiscount);
    } else {
      formSetValue(`invoiceLine[${index}].price.discount`, 0);
    }
  };

  React.useEffect(() => {
    //dispatch(getTaxBase());
    console.log('saasaasas', formGetValues(`invoiceLine[${index}] `));
  }, []);

  return (
    <Grid container spacing={1}>
      {/*<Grid item xs={0.2}>
        <p>{`${index + 1}.`}</p>
      </Grid>*/}
      {/*<Grid item xs={1.5}>
        <FormTextField
          props={{
            control: control,
            disabled: true,
            label: t(fieldLabels.productName),
            name: `invoiceLine[${index}].item.name`,
            additional: {
              suffix: "",
              readonly: true,
            },
          }}
        />
        </Grid>*/}

      <Grid item xs={1}>
        <FormCurrencyField
          props={{
            control: control,
            disabled: false,
            label: t(fieldLabels.invoicedQuantity),
            name: `invoiceLine[${index}].invoicedQuantity`,
            additional: {
              mask: {
                decimalScale: 1, //put condition if decimal show to be 1 else 0,
                prefix: '',
                allowNegative: true,
                maxValue: 100000,
                suffix: '',
              },
              readonly: false,
              parentFn: props.handleAddItemList,
            },
          }}
        />

        {/* `0` */}
      </Grid>

      <Grid item xs={1.5}>
        <FormTextField
          props={{
            control: control,
            label: t(fieldLabels.unitPrice),
            name: `invoiceLine[${index}].price.unitPrice`,
            additional: {
              mask: {},
              readonly: false,
              parentFn: props.handleAddItemList,
            },
            disabled: false,
          }}
        />
      </Grid>
      {/*<Grid item xs={1}>
        <FormTextField
          props={{
            control: control,
            disabled: true,
            label: t(fieldLabels.unitCode),
            name: `invoiceLine[${index}].unitCode`,
            additional: {
              suffix: "",
              readonly: true,
            },
          }}
        />
        </Grid>*/}
      <Grid item xs={1}>
        <FormTextField
          props={{
            control: control,
            disabled: true,
            label: t(fieldLabels.unitCode),
            name: `invoiceLine[${index}].unitName`,
            additional: {
              suffix: '',
              readonly: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={1}>
        <FormCurrencyField
          props={{
            control: control,
            disabled: false,
            label: t(fieldLabels.discount),
            name: `invoiceLine[${index}].price.discount`,
            additional: {
              mask: {
                decimalScale: 2,
                prefix: '',
                allowNegative: false,
                maxValue: 100,
                suffix: ' %',
              },
              labelShrink: true,
              readonly: false,
              parentFn: props.handleAddItemList,
              parentFnChange: handleChangeDiscount,
            },
          }}
        />
      </Grid>
      <Grid item xs={1.5}>
        <FormTextField
          props={{
            control: control,
            label: t(fieldLabels.newPrice),
            name: `invoiceLine[${index}].price.newPrice`,
            additional: {
              mask: {},
              readonly: true,
              parentFnChange: handleChangeNewPrice,
            },
            disabled: true,
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <FormTextField
          props={{
            control: control,
            disabled: true,
            label: t(fieldLabels.percent),
            name: `invoiceLine[${index}].item.classifiedTaxCategory.percent`,
            additional: {
              suffix: '%',
              readonly: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={2}>
        <FormAutocompleteField
          props={{
            name: `invoiceLine[${index}].baseCode`,
            control: control,
            label: t('Sifra osnove'),
            disabled: vatRate,
            additional: {
              selector: selectTaxBase,
              disableOption: vatRate,
              defaultValue: formGetValues(`invoiceLine[${index}].baseCode`),
            },
          }}
        />

        {/*<FormTextField
          props={{
            name: `invoiceLine[${index}].baseCode`,
            control: control,
            label: t("Sifra osnove"),
            disabled: vatRate,
            additional: { mask: {}, readonly: true },
          }}
        />*/}
      </Grid>

      <Grid item xs={1}>
        <FormTextField
          props={{
            control: control,
            disabled: vatRate,
            label: t('Broj odluke'),
            name: 'brojOdluke',
            additional: { mask: {}, readonly: vatRate },
          }}
        />
      </Grid>

      {/*<Grid item xs={1}>
        <FormCurrencyField
          props={{
            control: control,
            label: t(fieldLabels.unitTaxAmount),
            name: `invoiceLine[${index}].price.unitTaxAmount`,
            additional: { mask: {}, readonly: true, labelShrink: true },
            disabled: true,
          }}
        />
        </Grid>*/}

      <Grid item xs={1.5}>
        <FormCurrencyField
          props={{
            control: control,
            label: t(fieldLabels.priceAmount),
            name: `invoiceLine[${index}].price.priceAmount`,
            additional: { mask: {}, readonly: true },
            disabled: true,
          }}
        />
      </Grid>

      <Grid
        item
        xs={0.3}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <IconButton
          aria-label="delete"
          onKeyDown={(event) => handleTab(event)}
          onClick={() => props.handleAddItemList(index)}
          sx={{ bottom: 3 }}
        >
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
