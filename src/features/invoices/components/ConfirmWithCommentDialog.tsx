import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import * as yup from 'yup';
import { IProps } from '../models';
import FormTextAreaField from './form-fields/FormTextAreaField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

type ConfirmWithCommentDialogProps = {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: any) => void;
  action?: string;
};

export default function ConfirmWithCommentDialog({
  props,
}: IProps<ConfirmWithCommentDialogProps>) {
  const schema =
    props.action === 'reject' ||
    props.action === 'cancel' ||
    props.action === 'storno'
      ? yup
          .object({
            controlArea: yup.string().trim().required('Komentar je obavezan'),
          })
          .required()
      : yup
          .object({
            //controlArea: yup.string().trim().required(" "),
          })
          .required();
  const { t } = useTranslation();
  const methods = useForm({
    defaultValues: { controlArea: '' },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset, control } = methods;
  const { onClose, open, ...other } = props;
  const handleCancel = (): void => {
    onClose({ flagButton: 'cancel' });
    reset();
  };

  const handleOk = handleSubmit((data: { controlArea: string }): void => {
    onClose({ comment: data.controlArea, flagButton: 'send' });
    reset();
  });

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>{t('Dialog.addCommentNew')}</DialogTitle>
      <DialogContent dividers>
        <FormTextAreaField
          props={{
            name: 'controlArea',
            control: control,
            disabled: false,
            label: '',
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          {t('Common.close')}
        </Button>
        <Button onClick={handleOk}> {t('Common.yes')}</Button>
      </DialogActions>
    </Dialog>
  );
}
