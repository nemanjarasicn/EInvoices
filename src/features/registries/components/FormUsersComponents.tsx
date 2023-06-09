import React from 'react';
import * as yup from 'yup';
import { Paper, Grid, Box } from '@mui/material';
import { RegistriesFormComponentProps } from './RegistriesFormComponent';
import { useTranslation } from 'react-i18next';
import { useComponentsStyles } from '../../shared/components/components.styles';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UsersFormModel, IProps } from '../models/registries.models';
import { selectCompaniesAll } from '../../shared/components/form-fields/store/form.selectors';
import { useNavigate } from 'react-router-dom';
import FormAutocompleteField from '../../shared/components/form-fields/FormAutocompleteField';
import MultipleSelect from '../../shared/components/form-fields/FormDropdownFieldNew';
import CustomButtonFc from '../../shared/components/CustomButtonFc';
import FormTextField from '../../shared/components/form-fields/FormTextField';
import { getCompaniesAll } from '../../shared/components/form-fields/store/form.actions';
import { selectUser } from '../../../app/core/core.selectors';
import { sendUsers, updateUser } from '../store/registries.actions';
import ErrorModal from '../../shared/components/ErrorModals';
import { getUserRole } from '../../shared/components/form-fields/store/form.actions';
import { selectUserRole } from '../../shared/components/form-fields/store/form.selectors';
import { useLocation } from 'react-router-dom';
import { openCloseSucessModal } from '../../shared/utils/utils';

/**
 * Register Form validation schema for every field
 */
const schema = yup
  .object({
    password: yup.string().required('Ovo je obavezno polje'),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Lozinke se ne poklapaju'),
    username: yup.string().trim().required('Ovo je obavezno polje'),
    userRole: yup.object().required('ovo je obavezno polje'),
  })
  .required();

export default function FormUsersComponent({
  props,
}: IProps<RegistriesFormComponentProps>): JSX.Element {
  const location = useLocation();
  const id = location.state.company;
  const idLocation = location.state.id;
  const userData: any = location.state.data;
  const userRoleTmp = useAppSelector(selectUserRole);
  const defaultValues: UsersFormModel = {
    id: '',
    companyId: id, //companyId ,
    username: '',
    password: '',
    confirmpassword: '',
    companyList: [],
    userRole: '',
  };
  const { t } = useTranslation();
  const { formComponent } = useComponentsStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isDistributor =
    useAppSelector(selectUser)?.authorities?.slice(0, 1)[0].authority ===
    'ROLE_DISTRIBUTER'
      ? true
      : false;
  const isAdmin =
    useAppSelector(selectUser)?.authorities?.slice(0, 1)[0].authority ===
    'ROLE_ADMIN'
      ? true
      : false;
  const userAuthority = isAdmin || isDistributor ? true : false;
  const [showErrorModal, setShowErrorModal] = React.useState(false);

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control, setValue } = methods;

  const onSubmit = (data: UsersFormModel) => {
    const actionUser =
      idLocation === 0
        ? sendUsers({ data })
        : updateUser({ id: idLocation, data: data });

    const navigateLoc = !(idLocation === 0)
      ? '/registries/companies'
      : !userAuthority
      ? '/registries/users'
      : '/registries/infoCompany';

    const stateTmp =
      idLocation === 0
        ? !userAuthority
          ? ''
          : {
              company: id,
            }
        : '';

    dispatch(actionUser).then((res) => {
      if (res.payload === 'sucsses') {
        openCloseSucessModal(navigateLoc, false, dispatch, navigate, stateTmp);
      } else {
        setShowErrorModal(true);
        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    });
  };

  React.useEffect(() => {
    dispatch(getCompaniesAll());
    dispatch(getUserRole());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (idLocation !== 0) {
      setValue('companyId', userData?.companyId);
      setValue('username', userData?.username);
      setValue(
        'userRole',
        userRoleTmp.find((item) => item.name === userData?.roleName[0]) as any
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRoleTmp]);

  return (
    <Grid item xs={12}>
      <ErrorModal open={showErrorModal}></ErrorModal>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {false ? (
            <MultipleSelect
              props={{
                selector: selectCompaniesAll,
                control: control,
                name: 'companyList',
              }}
            />
          ) : (
            <FormTextField
              props={{
                control: control,
                name: 'companyId',
                label: t(props.formFieldsLabels.users.company),
                disabled: true,
                additional: { readonly: true, labelShrink: true },
              }}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            props={{
              control: control,
              name: 'username',
              label: t(props.formFieldsLabels.users.username),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <FormAutocompleteField
            props={{
              name: 'userRole',
              control: control,
              label: 'Korisnicka rola',
              disabled: true,
              additional: {
                selector: selectUserRole,
                //data: dataObject
                disable: true,
              },
            }}
          />

          <FormTextField
            props={{
              control: control,
              name: 'password',
              label: t(props.formFieldsLabels.users.password),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />

          <FormTextField
            props={{
              control: control,
              name: 'confirmpassword',
              label: t(props.formFieldsLabels.users.confirmPassword),
              disabled: false,
              additional: { readonly: false, labelShrink: true },
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Box
          sx={{
            ...formComponent.basicBox,
            textAlign: 'end',
          }}
        >
          <Paper sx={formComponent.paper}>
            <CustomButtonFc
              groupButton={[
                {
                  title: 'DELETE',
                  disabled: true,
                  btnFn: () => reset(),
                },
                {
                  title: 'DOWNLOAD',
                  disabled: true,
                  btnFn: () => reset(),
                },
                {
                  title: 'UPDATE',
                  disabled: true,
                  btnFn: () => reset(),
                },
                {
                  title: 'SACUVAJ',
                  disabled: false,
                  btnFn: handleSubmit(onSubmit),
                },
              ]}
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
