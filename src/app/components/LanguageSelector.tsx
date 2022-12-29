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

  const marginLanguage = window.devicePixelRatio == 1.5 ? 0.5 : 1; 
  const fontSize  =    window.devicePixelRatio === 1.5 ?    '10px' :  '16px';
  
  const heightSize  =     window.devicePixelRatio === 1.5 ?    '15px' :  '';
  const   minWidthSelect  =   window.devicePixelRatio === 1.5 ?    70   :   120; 
  return (
    <FormControl sx={{ m:  marginLanguage, minWidth:   minWidthSelect, color:  'white' }} size="small">
      <Select
        sx={{ color: "#E8E9EA" ,  backgroundColor:'#4E595F',
        "& .MuiSvgIcon-root": {
          color: "#E8E9EA",

        },
        '& .MuiSelect-select': {
          fontSize: `${fontSize}`,
          height:  heightSize,
          alignItems: 'center',
          display:  'flex'
       }
        
        }}
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
