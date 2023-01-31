import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@mui/material";
import FormTextField from "../../features/invoices/components/form-fields/FormTextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export class ModalFormModel {
  authKey: string = "";
}

const schema = yup.object().shape({
  authKey: yup.string().required(" "),
});

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

export default function TokenExpireModel() {
  const defaultValues = new ModalFormModel();
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const { control, handleSubmit } = methods;

  const redirect = () => {
    window.open("https://demoefaktura.mfin.gov.rs/login", "_blank");
  };

  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("Token je istekao")}
          </Typography>
          <br />
          <FormTextField
            props={{
              name: "authKey",
              control: control,
              label: `${t("AuthModal.label")}`,
              disabled: false,
              additional: {
                labelShrink: true,
              },
            }}
          />
          <Stack direction="row" style={{ justifyContent: "end" }} spacing={1}>
            <Button variant="outlined" onClick={redirect}>
              {t("AuthModal.redirectButtonTitle")}
            </Button>
            <Button variant="outlined" >
              {t("AuthModal.saveButtonTitle")}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
