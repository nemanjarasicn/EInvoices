/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../hooks";
import { login } from "../core/core.actions";
import { hasError, loginLoading } from "../core/core.selectors";
import { resetError } from "../core/core.reducer";
import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setCompanyCurrent }  from  "../core/core.reducer";


function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://www.mastersoftware.rs/">
        mastersoftware.rs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(hasError);
  const loading = useAppSelector(loginLoading);
  
  React.useEffect(() => {
    window.location.reload();
  }, []);

  React.useEffect(() => {
    if (Boolean(sessionStorage.getItem("token"))) navigate("/");
  }, [sessionStorage.getItem("token")]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      login({
        credentials: {
          username: data.get("username")?.toString() ?? "",
          password: data.get("password")?.toString() ?? "",
        },
      })
    ).then((res)  => {
      dispatch(setCompanyCurrent(res.payload.companyId[0]));
      if(!res.payload.error)   navigate('/')
    }) 
  };

  const handleFocus = (): void => {
    if (error) dispatch(resetError({}));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Prijava
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="username"
            autoComplete="username"
            autoFocus
            onFocus={handleFocus}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Šifra "
            type="password"
            id="password"
            autoComplete="current-password"
            onFocus={handleFocus}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Prijava
          </Button>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ color: "red" }}
      >
        {error}
      </Typography>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Container>
  );
}
