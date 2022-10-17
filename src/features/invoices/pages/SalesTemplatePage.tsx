import React from "react";
import InvoiceDropzoneComponent from "../components/InvoiceDropzoneComponent";
import InvoiceFormComponent from "../components/InvoiceFormComponent";
import { CreateType } from "../models/invoice.enums";
import { IProps } from "../models/invoice.models";
import { useFeatureSettings } from "../settings";

type SalesTemplateProps = {
  type: CreateType;
};

export default function SalesTemplatePage({
  props,
}: IProps<SalesTemplateProps>): JSX.Element {
  const { salesTemplatePageSettings } = useFeatureSettings();
  return (
    <>
      {(() => {
        switch (props.type) {
          case CreateType.XML:
            return (
              <InvoiceDropzoneComponent
                props={salesTemplatePageSettings[CreateType.XML]}
              />
            );

          case CreateType.FORM:
            return (
              <InvoiceFormComponent
                props={salesTemplatePageSettings[CreateType.FORM]}
              />
            );
          default:
            throw new Error("Pass Type of creation");
        }
      })()}
    </>
  );
}
