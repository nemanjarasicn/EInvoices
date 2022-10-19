import React from "react";
import InvoiceDropzoneComponent, {
  InvoiceDropzoneProps,
} from "../components/InvoiceDropzoneComponent";
import InvoiceFormComponent, {
  InvoiceFormComponentProps,
} from "../components/InvoiceFormComponent";
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
                props={
                  salesTemplatePageSettings[
                    CreateType.XML
                  ] as InvoiceDropzoneProps
                }
              />
            );

          case CreateType.FORM:
            return (
              <InvoiceFormComponent
                props={
                  salesTemplatePageSettings[
                    CreateType.FORM
                  ] as InvoiceFormComponentProps
                }
              />
            );
          default:
            throw new Error("Pass Type of creation");
        }
      })()}
    </>
  );
}
