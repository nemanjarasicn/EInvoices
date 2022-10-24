import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

type SearchFieldProps = {};

export default function SearchField({}: SearchFieldProps): JSX.Element {
  const { t } = useTranslation();
  const [value, setValue] = useState("searchValue");

  const textInput = React.useRef({ value: "" });

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {};

  const location = useLocation();

  function getSearhTab(): any {
    if (location.pathname.includes("sale")) {
      return t('SearchField.searchOutgoingdocuments');
    }
    if (location.pathname.includes("purchases")) {
      return t('SearchField.searchIncomingdocuments');
    }
    return "";
  }

  const search = () => () => {};

  function getCheckbox(): any {
    if (getSearhTab() !== "") {
      return (
        <Checkbox
          size="small"
          sx={{ color: '"#dedede"' }}
          icon={<RadioButtonUncheckedIcon style={{ color: "#dedede" }} />}
          checkedIcon={<CheckCircleOutlineIcon style={{ color: "#dedede" }} />}
        />
      );
    }
  }

  return (
    <div style={{ textAlign: "center", margin: "10px 10px 10px -10px" }}>
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          borderColor: "#dedede",
          borderBlockColor: "#dedede",
          borderWidth: 0,
        }}
      >
        <OutlinedInput
          id="outlined-adornment-search"
          placeholder={t('SearchField.documentSearch')}
          onChange={(newValue) => {
            setValue(newValue.target.value);
          }}
          inputRef={textInput}
          endAdornment={
            <InputAdornment
              position="end"
              style={{ fontSize: "12px", color: "#dedede" }}
            >
              {getCheckbox()}
              {getSearhTab()}
              <IconButton onClick={search()}>
                <SearchIcon sx={{ color: "#787993" }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setValue("");
                  textInput.current.value = "";
                }}
              >
                <CloseIcon sx={{ color: "#787993" }} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}
