import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
    SvgIconTypeMap,
  } from "@mui/material";
  import React from "react";
  import { useTranslation } from "react-i18next";
  import { OverridableComponent } from "@mui/material/OverridableComponent";
  import { useComponentsStyles } from "./components.styles";
  import  { ButtonProps } from "../../shared/components/CustomButtonFc";
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
    const sizeIcons = window.devicePixelRatio === 1.5 ? '40px' : '80px'; 
    const sizeTitleCard = window.devicePixelRatio === 1.5 ? '22px' : '32px'; 
    const sizeSubTitleCard = window.devicePixelRatio === 1.5 ? '12px' : '16px'; 
    const minWidthCard = window.devicePixelRatio === 1.5 ?  200 : 275; 
    return (
      <Box sx={{ minWidth:   minWidthCard }}>
        <Card sx={invoiceCardStyles.card}   onClick={!props.cardBtn.disabled ?  props.cardBtn.btnFn  : undefined }>
          <React.Fragment>
            <CardHeader
              sx={invoiceCardStyles.cardHeader}
              titleTypographyProps={{
                fontSize: sizeTitleCard,
                fontWeight: 500
              }}
              title= {t(`${props.title}`)}
            />
            <CardContent sx={invoiceCardStyles.cardContent}>
              <Typography>
                <Icon  sx={{fontSize: sizeIcons, color: theme.palette.secondary.main}} />
              </Typography>
            </CardContent>
            <div style={invoiceCardStyles.cardContent}>
                <Typography
                    component="h5"
                    variant="subtitle1"
                    gutterBottom
                    sx={{ textAlign: "center", p: 2, color: '#979A9A', fontSize:   sizeSubTitleCard, fontWeight: 500}}
                  >
                    {t('Pogledajte sve artikle, izmenite ili napravite novi artikal')}
                </Typography>
          </div>
          </React.Fragment>
        </Card>
      </Box>
    );
  }
  