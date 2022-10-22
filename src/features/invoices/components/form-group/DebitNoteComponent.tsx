import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { IProps } from "../../models";
import { useComponentsStyles } from "../components.styles";
import FormDateField from "../form-fields/FormDateField";
import FormDropdownField from "../form-fields/FormDropdownField";
import FormTextField from "../form-fields/FormTextField";

type DebitNoteComponentProps = {
  control: Control<any, any>;
};

export default function DebitNoteComponent({
  props,
}: IProps<DebitNoteComponentProps>): JSX.Element {
  const { formComponent } = useComponentsStyles();
  const [relationType, setRelationType] = React.useState<number>(1);
  const fieldNames: string[] = [
    "periodFrom",
    "sourceInvoice",
    "datumObracunaPDV",
    "periodTo",
    "datumDospeca",
  ];

  //   React.useEffect(() => {
  //     console.log("RELATION TYPE", relationType);
  //   }, [relationType]);

  /**
   * Unmount and unregister fields
   */
  React.useEffect(
    () => () => {
      console.log("UNMOUNT");

      fieldNames.map((field) => {
        props.control.unregister(field);
      });
    },
    []
  );

  return (
    <Box
      sx={{
        ...formComponent.basicBox,
        textAlign: "start",
      }}
    >
      <Typography sx={formComponent.typography}>KNJIZNO ZADUZENJE</Typography>
      <Paper
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          background: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl size={"small"} fullWidth>
              <InputLabel id={`select-label_${"static"}.id`}>
                Knjizno odobeneje se odnosi na
              </InputLabel>
              <Select
                labelId={`select-label_${"static"}.id`}
                id={`select-component_${"static"}.id`}
                onChange={(e) => setRelationType(e.target.value as any)}
                value={relationType}
                label={"Knjizno odobeneje se odnosi na"}
              >
                {[
                  { name: "Pojedinacna/Invoice selection", value: 1 },
                  { name: "Period/Period selection", value: 2 },
                ].map((option: any, index: number) => {
                  return (
                    <MenuItem key={index} value={option.value}>
                      {`${option.name}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            {relationType === 2 && (
              <FormDateField
                props={{
                  name: "periodFrom",
                  control: props.control,
                  label: "Datum From",
                  disabled: false,
                }}
              />
            )}
            {relationType === 1 && (
              <FormTextField
                props={{
                  name: "sourceInvoice",
                  control: props.control,
                  label: "Izvorna Faktura/Source Invoice",
                  disabled: false,
                }}
              />
            )}
            <FormDropdownField
              props={{
                name: "datumObracunaPDV",
                control: props.control,
                label: "Datum Obracuna PDV",
                disabled: false,
                options: [{ name: "Obracun PDV na dan placanja", value: "3" }],
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {relationType === 2 && (
              <FormDateField
                props={{
                  name: "periodTo",
                  control: props.control,
                  label: "Datum To",
                  disabled: false,
                }}
              />
            )}

            <FormDateField
              props={{
                name: "datumDospeca",
                control: props.control,
                label: "Datum Dospeca",
                disabled: false,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
