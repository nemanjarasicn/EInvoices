import { Outlet } from 'react-router-dom';

/*const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "1rem",
}));*/

//type RegistriesLayoutProps = {};

export default function RegistriesLayout(): JSX.Element {
  return (
    <>
      {/*<Grid item xs={4} mb={2} mt={2}>
          <Item>
            <h3>{t("Menu.registries")}</h3>
          </Item>
    </Grid>*/}
      <Outlet />
    </>
  );
}
