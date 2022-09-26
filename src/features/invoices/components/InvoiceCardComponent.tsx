import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  SvgIconTypeMap,
} from "@mui/material";
import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useTranslation } from "react-i18next";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useComponentsStyles } from "./components.styles";

export interface CardProps {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  cardFn?: () => void;
  cardBtnTitle: string;
}
export default function InvoiceCardComponent(props: CardProps) {
  const { t } = useTranslation();
  const { invoiceCardStyles } = useComponentsStyles();
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card sx={invoiceCardStyles.card}>
        <React.Fragment>
          <CardContent sx={invoiceCardStyles.cardContent}>
            <Typography
              component="h5"
              variant="h6"
              color="primary"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              {t(`${props.title}`)}
            </Typography>
            <Typography>{getIcon(props.icon)}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" onClick={props.cardFn}>
              {t(`${props.cardBtnTitle}`)}
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}

function getIcon(
  icon:
    | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string })
    | undefined
): any {
  if (!icon) return <ExitToAppIcon fontSize={"large"} />;
  const Icon = icon;
  return <Icon fontSize={"large"}></Icon>;
}