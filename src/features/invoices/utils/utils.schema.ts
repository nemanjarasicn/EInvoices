import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

function useSchemaValidator() {
  const { t } = useTranslation();
  /**
   * Register Form validation schema for every field
   */
  const schema = yup
    .object({
      foundClient: yup
        .object()
        .test(
          "",
          t("Validation.buyer"),
          (val) => val && Boolean(Object.keys(val).length)
        ),
      id: yup.string().required(""),
      invoiceLine: yup
        .array()
        .min(1, t("Validation.items"))
        .of(
          yup.object({
            invoicedQuantity: yup.number().typeError("").moreThan(0, ""),
          })
        ),
      referenceNumber: yup.string().required(""),
      modelNumber: yup.string().required(""),
    })
    .required();

  return schema;
}

export { useSchemaValidator };
