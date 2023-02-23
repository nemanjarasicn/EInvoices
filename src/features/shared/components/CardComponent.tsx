import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  SvgIconTypeMap,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useComponentsStyles } from './components.styles';
import { ButtonProps } from '../../shared/components/CustomButtonFc';
import { useTheme } from '@mui/material/styles';
import { IProps } from '../../registries/models/registries.models';

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
  const theme = useTheme();
  const { invoiceCardStyles } = useComponentsStyles(props.cardBtn.disabled);
  const Icon = props.icon;
  const sizeIcons = window.devicePixelRatio === 1.5 ? '40px' : '40px';
  const sizeTitleCard = window.devicePixelRatio === 1.5 ? '16px' : '20px';
  const sizeSubTitleCard = window.devicePixelRatio === 1.5 ? '12px' : '16px';
  const minWidthCard = window.devicePixelRatio === 1.5 ? 200 : 275;
  const marginTopCard = window.devicePixelRatio === 1.5 ? '15px' : '40px';

  const description = props.description
    ? props.description
    : 'MenuDescription.default';
  return (
    <Box sx={{ minWidth: minWidthCard }}>
      <Card
        sx={invoiceCardStyles.card}
        onClick={!props.cardBtn.disabled ? props.cardBtn.btnFn : undefined}
      >
        <React.Fragment>
          <CardContent sx={invoiceCardStyles.cardContent}>
            <Typography>
              <Icon
                sx={{ fontSize: sizeIcons, color: 'black', mt: marginTopCard }}
              />
            </Typography>
          </CardContent>
          <CardHeader
            sx={invoiceCardStyles.cardHeader}
            titleTypographyProps={{
              fontSize: sizeTitleCard,
              fontWeight: 500,
            }}
            title={t(`${props.title}`)}
          />
          <Typography
            component="h5"
            variant="subtitle1"
            gutterBottom
            sx={{
              textAlign: 'center',
              p: 2,
              color: '#979A9A',
              fontSize: sizeSubTitleCard,
              fontWeight: 400,
              mt: -4,
            }}
          >
            {t(`${description}`)}
          </Typography>
        </React.Fragment>
      </Card>
    </Box>
  );
}
