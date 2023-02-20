import React from "react";
import { Grid, Box } from "@mui/material";
import { ArticlesFormComponentProps } from "./ArticlesFormComponent";
import FormTextField from "../../shared/components/form-fields/FormTextField";
import { useComponentsStyles } from "../../shared/components/components.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import CustomButtonFcTra from "../../shared/components/CustomButtonFcTra";
import { ArticleFormModel, IProps } from "../models/articles.models";
import { useNavigate } from "react-router-dom";
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import ErrorModal from "../../shared/components/ErrorModals";
import SucessModal from "../../shared/components/SucessModal";
import {
  getObjectsAll,
  getMarketPlacesAll,
  getTaxBase,
} from "../../shared/components/form-fields/store/form.actions";
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import {
  selectUnitsAll,
  selectVatsAll,
  selectMarketPlaces,
  selectTaxCode,
  selectTaxBase,
} from "../../shared/components/form-fields/store/form.selectors";
import { sendArticle, sendArticleUpdate } from "../store/articles.actions";
import {
  setopenModalCreateArtical,
  setopenModalCreateArticalPrice,
  setOpenSucessModal,
} from "../store/articles.reducer";
//import ClientComponent from "./form-group/ClientComponent";

export default function FormArticleComponent({
  props,
}: IProps<ArticlesFormComponentProps>): JSX.Element {
  const companyId = useAppSelector(selectCompanyCurrent) as any;
  const [showTaxBase, setShowTaxBase] = React.useState("none");
  const vatTmp = useAppSelector(selectVatsAll);
  const unitCodeTmp = useAppSelector(selectUnitsAll);
  const [statusUnit, setStatusUnit] = React.useState("NONE");
  const [statusVat, setStatusVat] = React.useState("NONE");
  const [statusTax, setStatusTax] = React.useState("NONE");

  /**
   * Register Form validation schema for every field
   */
  const schema = yup
    .object({
      productName: yup.string().required("ovo je obavezno polje"),
      code: yup.string().required("ovo je obavezno polje"),
      productTaxCategory: yup.object().required("ovo je obavezno polje"),
      barCode: yup
        .string()
        .matches(/^(|.{5,})$/, "Mora imati najmanje 5 cifara"),
      productUnitRequest: yup.object().required("ovo je obavezno polje"),
      productVatRequest: yup.object().required("ovo je obavezno polje"),
    })
    .required();

  const defaultValues: ArticleFormModel = {
    productName: "",
    sale: true,
    recipe: true,
    stock: true,
    production: true,
    consumables: true,
    modificationRequired: true,
    decimalShow: true,
    priceChangeForbidden: true,
    barCode: "",
    code: "",
    idCompany: companyId,
    idObject: 0,
    productUnitRequest: "",
    productVatRequest: "",
    productTaxCategory: "",
    price: "",
    marketPlaceDtos: useAppSelector(selectMarketPlaces).map((item) => ({
      uuid: item.item.uuid,
      id: item.item.id,
      marketPlaceName: item.item.marketPlaceName,
      status: {
        status: "NONE",
      },
    })),
    taxcodeValue: "",
    taxCode: {
      idTaxCategory: "",
      taxCategoryName: "",
      taxCategoryCode: "",
      value1: "",
      idCountry: "",
    },
    taxBaseValue: "",
    taxBase: {
      id: "",
      name: "",
      description: "",
      taxCategory: "",
    },
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showError, setShowError] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const marginTopBox = window.devicePixelRatio == 1.5 ? 3 : 5;

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, watch, setValue, getValues } = methods;

  React.useEffect(() => {
    dispatch(getObjectsAll({ companyId: companyId }));
    //dispatch(getUnitsAll());
    //dispatch(getTaxCode()); ovo pozivamo na ucitavanje stranice
    dispatch(getMarketPlacesAll({ companyId: companyId }));
    //dispatch(getVatAll());

    if (props?.flag === "edit") {
      const vatObject = vatTmp.find((item) => item?.name === props?.data?.vat);
      const unitCodeObject = unitCodeTmp.find(
        (item) => item?.item?.productUnitCode === props?.data?.unitCode
      );
      setValue("productName", props?.data?.productName);
      setValue("code", props?.data?.code);
      setValue(
        "barCode",
        props?.data?.barCode !== "00000" ? props?.data?.barCode : ""
      );
      setValue("productVatRequest", vatObject);
      setValue("productUnitRequest", unitCodeObject);
    }
  }, []);

  React.useEffect(() => {
    const taxCode1 = getValues("productTaxCategory");
    if (taxCode1) {
      if (taxCode1?.item?.value1 === 1) {
        dispatch(
          getTaxBase({
            id: Number(getValues("productTaxCategory").item.idTaxCategory),
          })
        );
        setShowTaxBase("block");
      } else {
        setShowTaxBase("none");
        setValue("taxcodeValue", "");
      }
    }
    setValue("taxcodeValue", String(taxCode1.value1));
    setStatusTax("UPDATE");
  }, [watch("productTaxCategory")]);

  const onSubmit = async (data: ArticleFormModel) => {
    if (props.flag !== "edit") {
      await dispatch(sendArticle({ data })).then(async (res) => {
        if (res.payload.message === "sucsess") {
          dispatch(setopenModalCreateArtical({ open: false }));
          dispatch(setOpenSucessModal(true));
          setTimeout(() => {
            dispatch(setOpenSucessModal(false));
            dispatch(
              setopenModalCreateArticalPrice({
                open: true,
                data: res.payload.data[0].createProduct,
                flag: "",
              })
            );
          }, 2000);
        } else {
          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
          }, 2000);
        }
      });
    } else {
      await dispatch(
        sendArticleUpdate({
          data: data,
          id: props?.data?.prodctId,
          status: {
            statusUnit: statusUnit,
            statusVat: statusVat,
            statusTax: statusTax,
          },
        })
      ).then(async (res) => {
        if (res.payload.message === "sucsess") {
          dispatch(setopenModalCreateArtical({ open: false }));
          dispatch(setOpenSucessModal(true));
          setTimeout(() => {
            dispatch(setOpenSucessModal(false));
            //dispatch(setopenModalCreateArticalPrice({open: true, data: res.payload.data[0].createProduct, flag: "" }));
            window.location.reload();
          }, 2000);
        } else {
          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
          }, 2000);
        }
      });
    }
  };

  const handleChangeSelectUnit = (value: any) => {
    setStatusUnit("UPDATE");
  };

  const handleChangeSelectVat = (value: any) => {
    setStatusVat("UPDATE");
  };

  return (
    <Grid item xs={12} sx={{ mt: marginTopBox }}>
      <SucessModal open={showError}></SucessModal>
      <ErrorModal open={showErrorModal}></ErrorModal>
      <Grid
        container
        spacing={2}
        sx={{ minHeight: "300px", marginTop: "10px" }}
      >
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: "productName",
              label: "Naziv artikla",
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormTextField
            props={{
              control: control,
              name: "code",
              label: "Šifra",
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormAutocompleteField
            props={{
              name: "productTaxCategory",
              control: control,
              label: "PDV kategorija",
              disabled: false,
              additional: {
                selector: selectTaxCode,
              },
            }}
          />

          <div style={{ display: showTaxBase }}>
            <FormAutocompleteField
              props={{
                name: "taxBase",
                control: control,
                label: "Osnov oslobodjenja pdv",
                disabled: false,
                additional: {
                  selector: selectTaxBase,
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: "barCode",
              label: "barkod",
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
          <FormAutocompleteField
            props={{
              name: "productUnitRequest",
              control: control,
              label: "Jedinica mere",
              disabled: false,
              additional: {
                selector: selectUnitsAll,
                parentFn: handleChangeSelectUnit,
              },
            }}
          />
          <FormAutocompleteField
            props={{
              name: "productVatRequest",
              control: control,
              label: "Vat",
              disabled: false,
              additional: {
                selector: selectVatsAll,
                parentFn: handleChangeSelectVat,
              },
            }}
          />

          <div style={{ visibility: "hidden" }}>
            <FormTextField
              props={{
                control: control,
                name: "taxcodeValue",
                label: "Vrednost PDV kategorije",
                disabled: false,
                additional: { readonly: true, labelShrink: true },
              }}
            />
          </div>
        </Grid>
      </Grid>

      <Grid item xs={5} sx={{ mt: 3 }}>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <CustomButtonFcTra
            soloButton={{
              title: "Otkaži",
              disabled: false,
              btnFn: () => dispatch(setopenModalCreateArtical({ open: false })),
            }}
          />

          <CustomButtonFc
            soloButton={{
              title: "SAČUVAJ",
              disabled: false,
              btnFn: handleSubmit(onSubmit),
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
