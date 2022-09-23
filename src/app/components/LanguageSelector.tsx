import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { availableLanguages } from "../../i18n/config";

export default function LanguageSelector(): JSX.Element {
  const { i18n } = useTranslation();
  const [language, setLanguage] = React.useState("srb");

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        sx={{ color: "white" }}
        id="demo-select-small"
        value={language}
        onChange={handleChange}
      >
        {availableLanguages.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {`${option.symbol}`}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
