import {
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
  } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks";
import { useAppDispatch } from "../hooks";
import  {  selectCompany  }  from "../core/core.selectors"
import { isLoadingFormShared } from "../../features/shared/components/form-fields/store/form.selectors";
import { Backdrop, CircularProgress } from "@mui/material";
import  { getCompaniesAllLogin  }  from  "../core/core.actions"
import { setCompanyCurrent } from "../core/core.reducer";
import { selectCompanyCurrent,  selectCompanyList }  from  "../core/core.selectors"
import { useForm } from "react-hook-form";


export default function CompaniesSelector(): JSX.Element {
    const { i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(isLoadingFormShared);
    const copaniesAll = useAppSelector(selectCompanyList);
    const companyUser = useAppSelector(selectCompany) as any;
    const [companyList, setCompanyList] =   React.useState<any[]>([]);
    const companyCurrentId =  useAppSelector(selectCompanyCurrent);
    const [company, setCompany] = React.useState(companyCurrentId as any);

    // for 150 zoom
    const marginLanguage = window.devicePixelRatio == 1.5 ? 0.5 : 1; 

    const handleChange = (event: SelectChangeEvent) => {
      setCompany(event.target.value);
      dispatch(setCompanyCurrent(event.target.value));
      window.location.reload();
    };

    React.useEffect(() => {
      dispatch(getCompaniesAllLogin());
      setCompanyList(copaniesAll.filter((item) => companyUser.indexOf(item.idCompany) > -1));
    }, []);

    const methods = useForm({
      defaultValues: {},
    });
    const {
      control,
    } = methods;

    return (
      <FormControl sx={{ m:  marginLanguage, minWidth: 250 }} size="small">
        <Select
          sx={{ color: "black" }}
          id="demo-select-small"
          value={company}
          onChange={handleChange}
        >
          {companyList.map((option, index) => {
            return (
              <MenuItem key={index} value={option.idCompany}>
                {`${option.companyName}`}
              </MenuItem>
            );
          })}
        </Select>
        <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading || companyList.length === 0}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        </div>
      </FormControl>
    );
  }
  