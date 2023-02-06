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
import { useComponentsStyles } from "../../../invoices/components/components.styles";
import { IProps } from "../../../registries/models/registries.models";
import { FormFieldProps } from "./models/form-fields.models";
import { Controller } from "react-hook-form";

type SearchFieldProps = FormFieldProps & {
  additional?: {
    readonly?: boolean;
    parentFn?:   Function; 
  };
};

export default function SearchField({props}: IProps<SearchFieldProps>): JSX.Element {
  const { t } = useTranslation();
  const { searchField } = useComponentsStyles();
  const [value, setValue] = useState("searchValue");

  const textInput = React.useRef({ value: "" });

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {};

  const location = useLocation();

  function getSearhTab(): any {
    if (location.pathname.includes("sale")) {
      return t("SearchField.searchOutgoingdocuments");
    }
    if (location.pathname.includes("purchases")) {
      return t("SearchField.searchIncomingdocuments");
    }
    return "";
  }

  const search = () => () => {};

  function getCheckbox(): any {
    if (getSearhTab() !== "") {
      return (
        <Checkbox
          size="small"
          sx={searchField.checkboxColor}
          icon={<RadioButtonUncheckedIcon style={searchField.checkboxColor} />}
          checkedIcon={<CheckCircleOutlineIcon style={searchField.checkboxColor} />}
        />
      );
    }
  }


  const handleParent  =  () =>  {
    if( props.additional?.parentFn){
      props.additional?.parentFn();
    }
  }

  return (
    <div style={searchField.searchFieldDiv}>
      <Controller 
        name={props.name}
        control={props.control}
        render={({ field: { onChange, value },fieldState: { error } }) => (
            <OutlinedInput
              id="outlined-adornment-search"
              placeholder={t(props.label)}
              onChange={(newValue) => {
                setValue(newValue.target.value);
                onChange(newValue.target.value)
              }}
              sx={searchField.outlinedInput}
              inputRef={textInput}
              endAdornment={
                <InputAdornment position="end" style={searchField.endAdornment}>
                  {getCheckbox()}
                  {getSearhTab()}
                  <IconButton onClick={search()}>
                    <SearchIcon sx={searchField.iconButtonColor}
                        onClick={() => {
                        handleParent();
                        }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setValue("");
                      textInput.current.value = "";
                    }}

                  >
                    <CloseIcon sx={searchField.iconButtonColor} />
                  </IconButton>
                </InputAdornment>
              }
            />
        )}
      />
    </div>
  );
}
