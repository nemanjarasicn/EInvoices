import React from 'react';
import * as yup from 'yup';
import { Grid } from '@mui/material';
import { ArticlesFormComponentProps } from './ArticlesFormComponent';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { PriceFormModel, IProps } from '../models/articles.models';
import { useNavigate } from 'react-router-dom';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import CustomButtonFcTra from '../../shared/components/CustomButtonFcTra';
import ErrorModal from '../../shared/components/ErrorModals';
import SucessModal from '../../shared/components/SucessModal';
import {
  getObjectsAll,
  getUnitsAll,
  getVatAll,
  getMarketPlacesAll,
} from '../../shared/components/form-fields/store/form.actions';
import { selectCompanyCurrent } from '../../../app/core/core.selectors';
import { sendArticlesPrice } from '../store/articles.actions';
import FormCurrencyField from '../../shared/components/form-fields/FormCurrencyField';
import {
  setopenModalCreateArticalPrice,
  setOpenSucessModal,
} from '../store/articles.reducer';

/**
 * Register Form validation schema for every field
 */
const schema = yup.object({}).required();

export default function FormArticlePriceComponent({
  props,
}: IProps<ArticlesFormComponentProps>): JSX.Element {
  const companyId = useAppSelector(selectCompanyCurrent);

  const defaultValues: PriceFormModel = {
    price: '',
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showError] = React.useState(false);
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control } = methods;

  React.useEffect(() => {
    dispatch(getObjectsAll({ companyId: companyId }));
    dispatch(getUnitsAll());
    dispatch(getVatAll());
    dispatch(getMarketPlacesAll({ companyId: companyId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (dataPrice: PriceFormModel) => {
    const data = {
      barCode: props?.data.barCode,
      code: props?.data.code,
      decimalShow: props?.data.decimalShow,
      groupName: props?.data.groupName,
      id: props?.flag === 'edit' ? props?.data.prodctId : props?.data.id,
      productName: props?.data.productName,
      typeName: props?.data.typeName,
    };
    await dispatch(sendArticlesPrice({ data: data, price: dataPrice })).then(
      (res) => {
        if (res.payload === 'sucsess') {
          dispatch(setopenModalCreateArticalPrice({ open: false }));
          dispatch(setOpenSucessModal(true));
          setTimeout(() => {
            navigate('/articles/articlesList');
            dispatch(setOpenSucessModal(false));
            window.location.reload();
          }, 2000);
          navigate('/articles/articlesList');
        } else {
          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
          }, 2000);
        }
      }
    );
  };

  return (
    <Grid item xs={12} sx={{ mt: 2 }}>
      <SucessModal open={showError}></SucessModal>
      <ErrorModal open={showErrorModal}></ErrorModal>

      <Grid
        container
        spacing={2}
        sx={{ minHeight: '150px', marginTop: '10px' }}
      >
        <Grid item xs={6}>
          <FormCurrencyField
            props={{
              name: 'price',
              control: control,
              label: 'Cena',
              additional: { mask: {}, readonly: false },
              disabled: false,
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <CustomButtonFcTra
            soloButton={{
              title: 'Otkaži',
              disabled: false,
              btnFn: () => dispatch(setopenModalCreateArticalPrice(false)),
            }}
          />

          <CustomButtonFc
            soloButton={{
              title: 'SAČUVAJ',
              disabled: false,
              btnFn: handleSubmit(onSubmit),
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
