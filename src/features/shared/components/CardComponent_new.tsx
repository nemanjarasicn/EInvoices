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
import CustomButtonFc, {
  ButtonProps,
} from '../../shared/components/CustomButtonFc';
import { IProps } from '../../registries/models/registries.models';

export interface CardProps {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  cardBtn: ButtonProps;
  typeOfCard: string;
}
export default function InvoiceCardComponentNew({
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
