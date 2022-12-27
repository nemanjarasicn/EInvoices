/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IProps } from "../../models";
import { Grid, IconButton } from "@mui/material";
import FormTextField from "../form-fields/FormTextField";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from "@mui/icons-material/Delete";
import FormCurrencyField from "../form-fields/FormCurrencyField";
import {
  calculateNewPrice,
  calculateTax,
  calculateTotal,
} from "../../utils/utils";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const {
    control,
    formWatch,
    formSetValue,
    formGetValues,
    index,
    fieldLabels,
  } = props;


  const vatRate =  formGetValues(`invoiceLine[${index}].item.classifiedTaxCategory.percent`) ? true  :  false;




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

  return (
    <Grid container spacing={1}>
      {/*<Grid item xs={0.2}>
        <p>{`${index + 1}.`}</p>
      </Grid>*/}
      <Grid item xs={1.5}>
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
        </Grid>
        
      <Grid item xs={0.8}>
        <FormCurrencyField
          props={{
            control: control,
            disabled: false,
            label: t(fieldLabels.invoicedQuantity),
            name: `invoiceLine[${index}].invoicedQuantity`,
            additional: {
              mask: {
                decimalScale: 1, //put condition if decimal show to be 1 else 0,
                prefix: "",
                allowNegative: true,
                maxValue: 100000,
                suffix: "",
              },
              readonly: false,
            },
          }}
        />

        {/* `0` */}
      </Grid>

      <Grid item xs={1}>
        <FormCurrencyField
          props={{
            control: control,
            label: t(fieldLabels.unitPrice),
            name: `invoiceLine[${index}].price.unitPrice`,
            additional: { mask: {}, readonly: true },
            disabled: true,
          }}
        />
      </Grid>
      <Grid item xs={0.8}>
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
      </Grid>
      <Grid item xs={0.8}>
        <FormCurrencyField
          props={{
            control: control,
            disabled: false,
            label: t(fieldLabels.discount),
            name: `invoiceLine[${index}].price.discount`,
            additional: {
              mask: {
                decimalScale: 2,
                prefix: "",
                allowNegative: false,
                maxValue: 100,
                suffix: " %",
              },
              labelShrink: true,
              readonly: false,
            },
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <FormCurrencyField
          props={{
            control: control,
            label: t(fieldLabels.newPrice),
            name: `invoiceLine[${index}].price.newPrice`,
            additional: { mask: {}, readonly: true },
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
              suffix: "%",
              readonly: true,
            },
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <FormCurrencyField
          props={{
            control: control,
            label: t(fieldLabels.unitTaxAmount),
            name: `invoiceLine[${index}].price.unitTaxAmount`,
            additional: { mask: {}, readonly: true, labelShrink: true },
            disabled: true,
          }}
        />
      </Grid>
      <Grid item xs={1}>
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
   
      <Grid item xs={1}>
        <FormTextField
          props={{
            control: control,
            disabled: vatRate,
            label: t('Sifra osnove'),
            name: 'sifraOsnove',
            additional: { mask: {}, readonly: vatRate  },
          }}
        />
        </Grid>

      <Grid item xs={1}>
        <FormTextField
          props={{
            control: control,
            disabled: vatRate,
            label: t('Broj odluke'),
            name: 'brojOdluke',
            additional: { mask: {}, readonly:   vatRate   },
          }}
        />
        </Grid>

      <Grid item xs={0.3}>
        <IconButton
          aria-label="delete"
          onClick={() => props.handleAddItemList(index)}
        >
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
