import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    CardActions,
    SvgIconTypeMap,
  } from "@mui/material";
  import React from "react";
  import { useTranslation } from "react-i18next";
  import { OverridableComponent } from "@mui/material/OverridableComponent";
  import { useComponentsStyles } from "./components.styles";
  import CustomButtonFc, { ButtonProps } from "../../shared/components/CustomButtonFc";
  import { useTheme } from '@mui/material/styles';
  import { IProps } from "../../registries/models/registries.models";
  
  export interface CardProps {
    title: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
    cardBtn: ButtonProps;
    typeOfCard: string;
  }
  export default function InvoiceCardComponent({
    props,
  }: IProps<CardProps>): JSX.Element {
    const { t } = useTranslation();
    const theme  =  useTheme();
    const { invoiceCardStyles } = useComponentsStyles(props.cardBtn.disabled);
    const Icon = props.icon;
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card sx={invoiceCardStyles.card}   onClick={props.cardBtn.btnFn} >
          <React.Fragment>
            <CardHeader
              sx={invoiceCardStyles.cardHeader}
              title= {t(`${props.title}`)}
            />
            <CardContent sx={invoiceCardStyles.cardContent}>
              <Typography>
                <Icon  sx={{fontSize: '80px', color: theme.palette.secondary.main}} />
              </Typography>
            </CardContent>
            <div style={invoiceCardStyles.cardContent}>
                <Typography
                    component="h5"
                    variant="subtitle1"
                    gutterBottom
                    sx={{ textAlign: "center", p: 2, color: '#979A9A'}}
                  >
                    {t('Pogledajte sve artikle, izmenite ili napravite novi artikal')}
                </Typography>
          </div>
          </React.Fragment>
        </Card>
      </Box>
    );
  }
  