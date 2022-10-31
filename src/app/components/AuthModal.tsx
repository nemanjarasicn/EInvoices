import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import FormTextField from "../../features/invoices/components/form-fields/FormTextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../hooks";
import { setIsAuthenticated } from "../../features/invoices/store/invoice.reducer";
import CustomButtonFc from "../../features/invoices/components/CustomButtonFc";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export class ModalFormModel {
  authKey: string = "";
}

const schema = yup
  .object().shape({
    authKey: yup.string()
    .required("api key is required")
    // .min(6, "api key is too short - should be 6 chars minimum"),
  })

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {

  const defaultValues = new ModalFormModel();

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { control, formState,  handleSubmit } = methods;


  const setValue = () => {
    dispatch(setIsAuthenticated(true));
  };

  const redirect = () => {

    console.log(control);
    window.open('https://demoefaktura.mfin.gov.rs/login', '_blank')
  }

  React.useEffect(() => {}, []);

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("AuthModal.title")}
          </Typography>
          <br />
          <FormTextField
            props={{
              name: "authKey",
              control: control,
              label: `${t("AuthModal.label")}`,
              disabled: false,
            }}
          />
          <CustomButtonFc
            groupButton={[
              {
                title: `${t("AuthModal.redirectButtonTitle")}`,
                disabled: false,
                btnFn: redirect,
              },
              {
                title: `${t("AuthModal.saveButtonTitle")}`,
                disabled: false,
                btnFn: handleSubmit(setValue),
              },
            ]}
          />
        </Box>
      </Modal>
    </div>
  );
}
