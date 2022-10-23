import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../hooks";
import { isLoading } from "../../features/invoices/store/invoice.selectors";
import { isLoadingForm } from "../../features/invoices/components/form-fields/store/form.selectors";

// TODO max instance
export default function AppLoader(): JSX.Element {
  const open: boolean = useAppSelector(isLoading);
  const open2 = useAppSelector(isLoadingForm);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open || open2}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
