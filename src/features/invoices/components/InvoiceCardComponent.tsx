import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  SvgIconTypeMap,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useComponentsStyles } from './components.styles';
import CustomButtonFc, { ButtonProps } from './CustomButtonFc';
import { IProps } from '../models/invoice.models';

export interface CardProps {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  cardBtn: ButtonProps;
  typeOfCard: string;
  description?: string;
}
export default function InvoiceCardComponent({
  props,
}: IProps<CardProps>): JSX.Element {
  const { t } = useTranslation();
  const { invoiceCardStyles } = useComponentsStyles();
  const Icon = props.icon;
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
              style={{ textAlign: 'center' }}
            >
              {t(`${props.title}`)}
            </Typography>
            <Typography>
              <Icon fontSize={'large'} />
            </Typography>
          </CardContent>
          <CardActions>
            <CustomButtonFc soloButton={props.cardBtn} />
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
