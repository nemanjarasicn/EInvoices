/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IProps } from "../../models";
import FormAutocompleteField from "../form-fields/FormAutocompleteField";
import { GroupFieldProps } from "../form-fields/models/form-fields.models";
import InvoiceLine from "./InvoiceLine";
import { selectProducts } from "../form-fields/store/form.selectors";
import { AutocompleteItem } from "../form-fields/models/form-fields.models";
import { useTranslation } from "react-i18next";

type InvoiceItemsComponentProps = Omit<GroupFieldProps, "title"> & {
  formSetValue: Function;
  formGetValues: Function;
  formWatch: Function;
  fieldLabels: any;
};

export default function InvoiceItemsComponent({
  props,
}: IProps<InvoiceItemsComponentProps>): JSX.Element {
  const { control, formWatch, formSetValue, formGetValues, fieldLabels } =
    props;
  const { t } = useTranslation();
  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    setItems(formGetValues("invoiceLine"));
  }, []);

  React.useEffect(() => {
    setItems([]);
    formSetValue("invoiceLine", []);
  }, [formWatch("warehouse_uuid")]);

  /**
   * Handle Add New Line
   */
  const handleAddLine = (item: AutocompleteItem) => {
    if (item && item.item) {
      const id = Math.random();
      setItems(() => [
        ...formGetValues("invoiceLine"),
        { idLine: id, ...item?.item },
      ]);
      formSetValue("invoiceLine", [
        ...formGetValues("invoiceLine"),
        { idLine: id, ...item?.item },
      ]);
    }
  };

  /**
   * Handle Delete Line
   */
  const handleDelete = (index: any) => {
    const newItems: any[] = formGetValues("invoiceLine").filter(
      (_val: any, i: any) => i !== index
    );
    setItems(newItems);
    formSetValue("invoiceLine", [...newItems]);
  };

  return (
    <>
      <div style={{ width: "50%" }}>
        <FormAutocompleteField
          props={{
            name: "foundProduct",
            control: control,
            label: t(fieldLabels.search.label),
            disabled: false,
            additional: {
              selector: selectProducts,
              parentFn: handleAddLine,
              labelShrink: true,
              placeholder: t(fieldLabels.search.placeholder),
              noResultText: t(fieldLabels.search.noResult),
            },
          }}
        />
      </div>
      {items.map((item: any, index: number) => {
        return (
          <InvoiceLine
            key={`invoice_liine_${item.idLine}_id`}
            props={{
              item: item,
              control: control,
              formWatch: formWatch,
              formSetValue: formSetValue,
              formGetValues: formGetValues,
              index: index,
              handleDelete: handleDelete,
              fieldLabels: fieldLabels.invoiceLine,
            }}
          ></InvoiceLine>
        );
      })}
    </>
  );
}
